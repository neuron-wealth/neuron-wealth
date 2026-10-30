function rateLimit({ windowMs, max, message }) {
  const hits = new Map();

  return (req, res, next) => {
    const key = req.ip || "local";
    const now = Date.now();
    let entry = hits.get(key);

    if (!entry || now - entry.start > windowMs) {
      entry = { start: now, count: 0 };
      hits.set(key, entry);
    }

    if (entry.count >= max) {
      return res.status(429).json({ message });
    }

    entry.count += 1;
    req.rateLimit = { reset: () => hits.delete(key) };
    return next();
  };
}

const FIFTEEN_MINUTES = 15 * 60 * 1000;

const loginLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 8,
  message: "Too many attempts. Try again in 15 minutes.",
});

const recoveryLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 3,
  message: "Too many reset requests. Try again in 15 minutes.",
});

const resetLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 10,
  message: "Too many attempts. Try again in 15 minutes.",
});

module.exports = { rateLimit, loginLimiter, recoveryLimiter, resetLimiter };
