const path = require("path");
const multer = require("multer");
const { HttpError } = require("../utils/http");
const { LOGO_RULES } = require("../services/siteSettingsService");
const { IMAGE_RULES, DOCUMENT_RULES } = require("../config/pageSchema");

function singleImage({ field, rules, typeMessage }) {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: rules.maxBytes, files: 1, fields: 4 },
    fileFilter: (req, file, callback) => {
      if (Object.values(rules.types).includes(file.mimetype)) return callback(null, true);
      return callback(new HttpError(400, typeMessage));
    },
  }).single(field);

  return (req, res, next) => {
    upload(req, res, (error) => {
      if (!error) return next();
      if (error.code === "LIMIT_FILE_SIZE") {
        return next(new HttpError(413, `${field === "logo" ? "Logo" : "Image"} must be ${rules.maxBytes / (1024 * 1024)} MB or smaller.`));
      }
      if (error instanceof multer.MulterError) return next(new HttpError(400, `Upload one image in the "${field}" field.`));
      return next(error);
    });
  };
}

const DOCUMENT_TYPE_MESSAGE = "Files must be PDF, Word (DOC/DOCX), Excel (XLS/XLSX) or PowerPoint (PPT/PPTX).";

// Browsers report Office files inconsistently, so documents are filtered by extension; the
// service then checks the file's real contents.
function singleDocument({ field, rules }) {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: rules.maxBytes, files: 1, fields: 4 },
    fileFilter: (req, file, callback) => {
      const ext = path.extname(file.originalname || "").slice(1).toLowerCase();
      if (rules.types[ext]) return callback(null, true);
      return callback(new HttpError(400, DOCUMENT_TYPE_MESSAGE));
    },
  }).single(field);

  return (req, res, next) => {
    upload(req, res, (error) => {
      if (!error) return next();
      if (error.code === "LIMIT_FILE_SIZE") return next(new HttpError(413, `Files must be ${rules.maxBytes / (1024 * 1024)} MB or smaller.`));
      if (error instanceof multer.MulterError) return next(new HttpError(400, `Upload one file in the "${field}" field.`));
      return next(error);
    });
  };
}

const uploadLogo = singleImage({ field: "logo", rules: LOGO_RULES, typeMessage: "Logo must be a PNG, JPG or WEBP image." });
const uploadImage = singleImage({ field: "image", rules: IMAGE_RULES, typeMessage: "Images must be PNG, JPG, WEBP or GIF." });
const uploadDocument = singleDocument({ field: "file", rules: DOCUMENT_RULES });

module.exports = { uploadLogo, uploadImage, uploadDocument, DOCUMENT_TYPE_MESSAGE };
