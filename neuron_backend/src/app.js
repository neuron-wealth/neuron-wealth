const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const apiRoutes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/$/, "");
      const allowed =
        env.corsOrigins.includes(normalized) ||
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
