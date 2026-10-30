function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Express only treats a middleware as an error handler when it declares four arguments.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "The request body is not valid JSON." });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "The request body is too large." });
  }

  if (!err.status) {
    console.error(`[API] ${req.method} ${req.originalUrl}:`, err);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }

  return res.status(err.status).json({ message: err.message });
}

module.exports = { notFound, errorHandler };
