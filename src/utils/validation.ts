/*
 * Created by Asad on 04 OCT 2025
 */

export type PasswordRequirement = 'length' | 'capital' | 'number' | 'special';

export const isEmail = (s: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(s);
};

export const isValidPassword = (
  password: string,
  minLength = 6
): { valid: boolean; missingRequirement?: PasswordRequirement } => {
  if (password.length < minLength) return { valid: false, missingRequirement: 'length' };
  if (!/[A-Z]/.test(password)) return { valid: false, missingRequirement: 'capital' };
  if (!/[0-9]/.test(password)) return { valid: false, missingRequirement: 'number' };
  if (!/[!@#$%^&*(),.?":{}|<>_\-~+=/\\[\]]/.test(password))
    return { valid: false, missingRequirement: 'special' };

  return { valid: true };
};

export const validatePassword = (password: string): string | undefined => {
  const { valid, missingRequirement } = isValidPassword(password);

  if (valid) return undefined;

  switch (missingRequirement) {
    case 'length':
      return 'passwordTooShort';
    case 'capital':
      return 'passwordMissingCapital';
    case 'number':
      return 'passwordMissingNumber';
    case 'special':
      return 'passwordMissingSpecial';
    default:
      return 'passwordRequirementsFail';
  }
};
