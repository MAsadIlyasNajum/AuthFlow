import { isEmail, minLength } from '../src/utils/validation';

describe('validation utils', () => {
  test('isEmail valid', () => {
    expect(isEmail('a@b.com')).toBe(true);
    expect(isEmail('bad-email')).toBe(false);
  });

  test('minLength', () => {
    expect(minLength('hello', 3)).toBe(true);
    expect(minLength('hi', 3)).toBe(false);
  });
});
