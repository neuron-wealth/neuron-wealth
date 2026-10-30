const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-z0-9._-]{3,32}$/;

function isEmail(value) {
  return EMAIL_PATTERN.test(String(value || ""));
}

function usernameError(value) {
  if (!USERNAME_PATTERN.test(value)) {
    return "Username must be 3 to 32 characters: lowercase letters, numbers, dots, dashes or underscores.";
  }
  return "";
}

function passwordError(value) {
  const password = String(value || "");
  if (password.length < 10) return "Password must be at least 10 characters long.";
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "Password must include at least one letter and one number.";
  }
  return "";
}

function maskEmail(email) {
  const [local = "", domain = ""] = String(email).split("@");
  if (!domain) return "";
  const visible = local.length <= 2 ? local.charAt(0) : `${local.charAt(0)}${local.charAt(1)}`;
  return `${visible}${"*".repeat(Math.max(local.length - visible.length - 1, 2))}${local.slice(-1)}@${domain}`;
}

function clean(value) {
  return String(value ?? "").trim();
}

module.exports = { isEmail, usernameError, passwordError, maskEmail, clean };
