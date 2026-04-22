import { describe, expect, it, vi } from 'vitest';
import { createFlaglyFromConfig } from './config';

describe('createFlaglyFromConfig', () => {
  it('returns booleanFlag and withBooleanFlag', () => {
    const flagSource = vi.fn(() => true);

    const flagly = createFlaglyFromConfig({
      flagSource,
      baseEnv: { region: 'ap-northeast-1' },
    });

    expect(flagly.booleanFlag).toBeTypeOf('function');
    expect(flagly.withBooleanFlag).toBeTypeOf('function');
  });
});
