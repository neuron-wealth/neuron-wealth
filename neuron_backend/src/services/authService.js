const jwt = require("jsonwebtoken");
const env = require("../config/env");
const adminService = require("./adminService");
const { isMailConfigured, sendMail } = require("./mailService");
const { resetEmail, changedEmail } = require("./emailTemplates");
const { verifyPassword, hashPassword, createResetToken, sha256 } = require("../utils/crypto");
const { usernameError, passwordError, maskEmail, clean } = require("../utils/validators");
const { HttpError } = require("../utils/http");

const PURPOSES = ["password", "username"];

function signToken(admin) {
  return jwt.sign({ sub: admin.id, tv: admin.tokenVersion }, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
}

async function login(identifier, password) {
  const admin = await adminService.findByIdentifier(identifier);
  if (!admin || !password || !verifyPassword(password, admin.passwordHash)) {
    throw new HttpError(401, "Username, email or password is incorrect.");
  }
  return { token: signToken(admin), admin: adminService.toPublic(admin) };
}

async function adminFromToken(token) {
  const payload = jwt.verify(token, env.jwt.secret);
  const admin = await adminService.findById(payload.sub);
  if (!admin || admin.tokenVersion !== payload.tv) return null;
  return admin;
}

async function requestRecovery(purpose) {
  if (!PURPOSES.includes(purpose)) throw new HttpError(400, "Unknown recovery type.");

  const admin = await adminService.getAdmin();
  if (!admin) throw new HttpError(503, "The admin account is not set up on the server yet.");
  if (!isMailConfigured()) {
    throw new HttpError(503, "Email delivery is not configured on the server, so a reset link cannot be sent. Add the SMTP settings to the backend .env file.");
  }

  const { token, tokenHash } = createResetToken();
  const minutes = env.recovery.tokenTtlMinutes;
  const expiresAt = new Date(Date.now() + minutes * 60 * 1000).toISOString();
  await adminService.update(admin, { reset: { tokenHash, purpose, expiresAt } });

  const url = `${env.recovery.appUrl}/reset?token=${token}`;
  try {
    await sendMail({ to: env.recovery.email, ...resetEmail({ purpose, username: admin.username, url, minutes }) });
  } catch (error) {
    await adminService.update(admin, { reset: adminService.emptyReset() });
    console.error("[Auth] Recovery email failed:", error.message);
    throw new HttpError(502, "The reset email could not be sent. Check the SMTP settings and try again.");
  }

  console.log(`[Auth] ${purpose} recovery link emailed to ${maskEmail(env.recovery.email)}.`);
  return { sentTo: maskEmail(env.recovery.email), expiresInMinutes: minutes };
}

async function findResetTarget(token) {
  const value = clean(token);
  const admin = value ? await adminService.findByResetHash(sha256(value)) : null;
  if (!admin) throw new HttpError(400, "This reset link is invalid or has expired. Request a new one.");
  return admin;
}

async function verifyReset(token) {
  const admin = await findResetTarget(token);
  return { purpose: admin.reset.purpose, username: admin.username };
}

async function completeReset({ token, password, username }) {
  const admin = await findResetTarget(token);
  const { purpose } = admin.reset;
  const changes = { reset: adminService.emptyReset(), tokenVersion: admin.tokenVersion + 1 };

  if (purpose === "password") {
    const error = passwordError(password);
    if (error) throw new HttpError(400, error);
    if (verifyPassword(password, admin.passwordHash)) {
      throw new HttpError(400, "Choose a password that is different from the current one.");
    }
    changes.passwordHash = hashPassword(password);
  } else {
    const next = clean(username).toLowerCase();
    const error = usernameError(next);
    if (error) throw new HttpError(400, error);
    if (next === admin.username) throw new HttpError(400, "That is already the current username.");
    changes.username = next;
  }

  const updated = await adminService.update(admin, changes);
  sendMail({ to: env.recovery.email, ...changedEmail({ purpose, username: updated.username }) }).catch((error) =>
    console.error("[Auth] Confirmation email failed:", error.message)
  );

  return {
    purpose,
    message:
      purpose === "password"
        ? "Your password has been changed. Sign in with the new password."
        : `Your username is now "${updated.username}". Sign in with the new username.`,
  };
}

module.exports = { login, adminFromToken, requestRecovery, verifyReset, completeReset };
