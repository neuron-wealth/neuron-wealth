const { Router } = require("express");
const multer = require("multer");
const { requireAuth } = require("../middleware/auth");
const library = require("../services/libraryService");
const { HttpError } = require("../utils/http");

const router = Router();
router.use(requireAuth);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: library.MAX_BYTES, files: library.MAX_FILES, fields: 4 },
}).array("files", library.MAX_FILES);

function receiveFiles(req, res, next) {
  upload(req, res, (error) => {
    if (!error) return next();
    if (error.code === "LIMIT_FILE_SIZE") return next(new HttpError(413, `Each file must be ${library.MAX_BYTES / (1024 * 1024)} MB or smaller.`));
    if (error.code === "LIMIT_FILE_COUNT" || error.code === "LIMIT_UNEXPECTED_FILE") return next(new HttpError(400, `Upload up to ${library.MAX_FILES} files at a time.`));
    return next(error);
  });
}

router.get("/", (req, res) => {
  res.json({ ...library.list(req.query.path), extensions: library.EXTENSIONS, maxBytes: library.MAX_BYTES, maxFiles: library.MAX_FILES });
});

router.get("/folders", (_req, res) => {
  res.json({ folders: library.allFolders() });
});

router.get("/search", (req, res) => {
  res.json({ files: library.search(req.query.q) });
});

router.post("/folders", (req, res) => {
  const folder = library.createFolder(req.body?.path, req.body?.name);
  res.status(201).json({ folder, message: `Folder "${folder.name}" created.` });
});

router.post("/upload", receiveFiles, (req, res) => {
  const result = library.saveUploads(req.query.path, req.files);
  const count = result.saved.length;
  res.status(count ? 201 : 200).json({
    ...result,
    message: count ? `${count} file${count === 1 ? "" : "s"} uploaded.` : "No files were uploaded.",
  });
});

router.patch("/rename", (req, res) => {
  const item = library.renameEntry(req.body?.path, req.body?.name, { folder: Boolean(req.body?.folder) });
  res.json({ item, message: "Renamed." });
});

router.post("/move", (req, res) => {
  const item = library.moveEntry(req.body?.path, req.body?.to);
  res.json({ item, message: "Moved." });
});

router.delete("/", (req, res) => {
  library.removeEntry(req.query.path, { folder: req.query.folder === "true" });
  res.json({ ok: true, message: req.query.folder === "true" ? "Folder deleted." : "File deleted." });
});

module.exports = router;
