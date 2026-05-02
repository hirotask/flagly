import { describe, expect, it, vi } from 'vitest';
import { createWithBooleanFlag } from './funcs';

describe('createWithBooleanFlag', () => {
  it('executes wrapped function when flag is enabled', () => {
    const fn = vi.fn((name: string) => `hello ${name}`);

    const withBooleanFlag = createWithBooleanFlag({
      flagSource: () => true,
    });

    const wrapped = withBooleanFlag({
      key: 'greeting',
      defaultValue: false,
    })(fn);

    const result = wrapped('flagly');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('flagly');
    expect(result).toBe('hello flagly');
  });

  it('does not execute wrapped function when flag is disabled', () => {
    const fn = vi.fn((name: string) => `hello ${name}`);

    const withBooleanFlag = createWithBooleanFlag({
      flagSource: () => false,
    });

    const wrapped = withBooleanFlag({
      key: 'greeting',
      defaultValue: true,
    })(fn);

    const result = wrapped('flagly');

    expect(fn).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('merges baseEnv and definition.env, and passes them to flagSource', () => {
    const flagSource = vi.fn(() => true);

    const withBooleanFlag = createWithBooleanFlag({
      flagSource,
      baseEnv: {
        region: 'ap-northeast-1',
        plan: 'free',
      },
    });

    const wrapped = withBooleanFlag({
      key: 'new-ui',
      defaultValue: false,
      env: {
        plan: 'pro',
        userId: 'u_123',
      },
    })(vi.fn());

    wrapped();

    expect(flagSource).toHaveBeenCalledTimes(1);
    expect(flagSource).toHaveBeenCalledWith('new-ui', false, {
      region: 'ap-northeast-1',
      plan: 'pro',
      userId: 'u_123',
    });
  });

  it('uses defaultValue when flagSource is omitted', () => {
    const fn = vi.fn(() => 'ok');

    const withBooleanFlag = createWithBooleanFlag({});

    const wrapped = withBooleanFlag({
      key: 'default-on',
      defaultValue: true,
    })(fn);

    const result = wrapped();

    expect(fn).toHaveBeenCalledTimes(1);
    expect(result).toBe('ok');
  });
});
