require("dotenv").config();
const path = require("path");
const { randomBytes } = require("crypto");

const isProduction = (process.env.NODE_ENV || "development") === "production";

function list(value, fallback) {
  return String(value || fallback)
    .split(",")
    .map((item) => item.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  // Proxies in front of the API (hosting load balancer). Needed so rate limits see each visitor IP.
  trustProxy: process.env.TRUST_PROXY !== undefined ? Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY : isProduction ? 1 : 0,
  corsOrigins: list(process.env.CORS_ORIGIN, "http://localhost:3001,http://localhost:3000"),
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URI || "",
  dataDir: process.env.DATA_DIR || path.join(__dirname, "..", "..", "data"),
  uploadsDir: process.env.UPLOADS_DIR || path.join(__dirname, "..", "..", "uploads"),

  jwt: {
    // Never a fixed fallback: production refuses to start without it (below); development gets a
    // random secret per run, so tokens simply expire on restart.
    secret: process.env.JWT_SECRET || randomBytes(32).toString("hex"),
    expiresIn: "8h",
  },

  admin: {
    username: String(process.env.ADMIN_USERNAME || "admin").trim().toLowerCase(),
    email: String(process.env.ADMIN_EMAIL || "").trim().toLowerCase(),
    password: String(process.env.ADMIN_PASSWORD || ""),
    name: process.env.ADMIN_NAME || "Neuron Admin",
  },

  recovery: {
    email: String(process.env.ADMIN_RECOVERY_EMAIL || process.env.ADMIN_EMAIL || "").trim().toLowerCase(),
    appUrl: String(process.env.ADMIN_APP_URL || "http://localhost:3001").replace(/\/$/, ""),
    tokenTtlMinutes: 30,
  },

  // Public website address, used for links in emails sent to visitors (e.g. comment replies).
  siteUrl: String(process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, ""),

  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: String(process.env.SMTP_SECURE || "").toLowerCase() === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.MAIL_FROM || process.env.SMTP_USER || "",
  },
};

if (!process.env.JWT_SECRET) {
  if (isProduction) throw new Error("[Config] JWT_SECRET must be set in production.");
  console.warn("[Config] JWT_SECRET is not set. Using a random development secret (sessions end on restart).");
}
if (!env.recovery.email) {
  console.warn("[Config] ADMIN_RECOVERY_EMAIL / ADMIN_EMAIL is not set, so recovery and notification emails have no inbox.");
}

module.exports = env;
