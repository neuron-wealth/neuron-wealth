const { adminFromToken } = require("../services/authService");
const { toPublic } = require("../services/adminService");

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Please sign in to continue." });
  }

  try {
    const admin = await adminFromToken(token);
    if (!admin) return res.status(401).json({ message: "Your session has ended. Please sign in again." });
    req.admin = toPublic(admin);
    return next();
  } catch {
    return res.status(401).json({ message: "Your session has ended. Please sign in again." });
  }
}

module.exports = { requireAuth };
