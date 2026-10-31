const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const apiRoutes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", env.trustProxy);

// Baseline security headers for every API response (JSON only, so a strict policy is safe).
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  });
  if (!req.path.startsWith("/api/uploads")) res.set("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
  if (env.nodeEnv === "production") res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/$/, "");
      const allowed =
        env.corsOrigins.includes(normalized) ||
        /^https?:\/\/([a-z0-9-]+\.)?neuronwealth\.com$/.test(normalized) ||
        (env.nodeEnv !== "production" && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalized));
      return callback(null, allowed);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.use(
  "/api/uploads",
  express.static(env.uploadsDir, {
    immutable: true,
    maxAge: "30d",
    fallthrough: false,
    setHeaders: (res) => {
      res.set("X-Content-Type-Options", "nosniff");
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
app.use("/api", apiRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
