const authService = require("../services/authService");
const { clean } = require("../utils/validators");

async function login(req, res) {
  const identifier = clean(req.body?.identifier || req.body?.username || req.body?.email);
  const password = String(req.body?.password || "");
  const result = await authService.login(identifier, password);
  req.rateLimit?.reset();
  res.json(result);
}

function me(req, res) {
  res.json({ admin: req.admin });
}

const requestRecovery = (purpose) => async (_req, res) => {
  const { sentTo, expiresInMinutes } = await authService.requestRecovery(purpose);
  res.json({
    ok: true,
    sentTo,
    expiresInMinutes,
    message: `A ${purpose === "password" ? "password reset" : "username recovery"} link was sent to ${sentTo}. It expires in ${expiresInMinutes} minutes.`,
  });
};

async function verifyReset(req, res) {
  res.json(await authService.verifyReset(req.body?.token));
}

async function completeReset(req, res) {
  const result = await authService.completeReset({
    token: req.body?.token,
    password: req.body?.password,
    username: req.body?.username,
  });
  res.json({ ok: true, ...result });
}

module.exports = {
  login,
  me,
  forgotPassword: requestRecovery("password"),
  forgotUsername: requestRecovery("username"),
  verifyReset,
  completeReset,
};
