export function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export function validateRequired(value) {
  return value && value.trim() !== "";
}
