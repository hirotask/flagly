import { describe, expect, it, vi } from 'vitest';
import { createBooleanFlag } from './decorator';

describe('createBooleanFlag', () => {
  it('executes method when flag is enabled', () => {
    const booleanFlag = createBooleanFlag({
      flagSource: () => true,
    });

    class Example {
      greet(name: string) {
        return `hello ${name}`;
      }
    }

    const descriptor = Object.getOwnPropertyDescriptor(Example.prototype, 'greet');
    if (!descriptor) {
      throw new Error('descriptor is not found');
    }

    booleanFlag({
      key: 'greeting',
      defaultValue: false,
    })(Example.prototype, 'greet', descriptor);

    Object.defineProperty(Example.prototype, 'greet', descriptor);

    const instance = new Example();
    const result = instance.greet('flagly');

    expect(result).toBe('hello flagly');
  });

  it('does not execute method when flag is disabled', () => {
    const spy = vi.fn();

    const booleanFlag = createBooleanFlag({
      flagSource: () => false,
    });

    class Example {
      greet(name: string) {
        spy(name);
        return `hello ${name}`;
      }
    }

    const descriptor = Object.getOwnPropertyDescriptor(Example.prototype, 'greet');
    if (!descriptor) {
      throw new Error('descriptor is not found');
    }

    booleanFlag({
      key: 'greeting',
      defaultValue: true,
    })(Example.prototype, 'greet', descriptor);

    Object.defineProperty(Example.prototype, 'greet', descriptor);

    const instance = new Example();
    const result = instance.greet('flagly');

    expect(spy).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('preserves this and passes merged env to flagSource', () => {
    const flagSource = vi.fn(() => true);

    const booleanFlag = createBooleanFlag({
      flagSource,
      baseEnv: {
        region: 'ap-northeast-1',
        plan: 'free',
      },
    });

    class Counter {
      count = 1;

      increment(value: number) {
        this.count += value;
        return this.count;
      }
    }

    const descriptor = Object.getOwnPropertyDescriptor(Counter.prototype, 'increment');
    if (!descriptor) {
      throw new Error('descriptor is not found');
    }

    booleanFlag({
      key: 'increment',
      defaultValue: false,
      env: {
        plan: 'pro',
        userId: 'u_123',
      },
    })(Counter.prototype, 'increment', descriptor);

    Object.defineProperty(Counter.prototype, 'increment', descriptor);

    const counter = new Counter();
    const result = counter.increment(2);

    expect(result).toBe(3);
    expect(counter.count).toBe(3);

    expect(flagSource).toHaveBeenCalledTimes(1);
    expect(flagSource).toHaveBeenCalledWith('increment', false, {
      region: 'ap-northeast-1',
      plan: 'pro',
      userId: 'u_123',
    });
  });
});
