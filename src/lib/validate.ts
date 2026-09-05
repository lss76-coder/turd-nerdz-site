// Shared phone-number validation for every form on the site (quote flow,
// booking form, contact form) so the rule and the error copy stay
// consistent no matter where someone types a phone number.

export const PHONE_PLACEHOLDER = "(850) 555-1234";

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  // Accept a plain 10-digit US number, or 11 digits with a leading 1.
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

export const PHONE_ERROR = `Enter a valid 10-digit phone number, like ${PHONE_PLACEHOLDER}.`;
