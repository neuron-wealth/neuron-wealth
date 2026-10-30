const { HttpError } = require("./http");
const { isEmail } = require("./validators");
const { NOTES_MAX, SOURCE_MAX } = require("../config/recordTypes");

const PHONE_PATTERN = /^\+?[0-9\s()\-.]{6,30}$/;

function text(value, multiline) {
  const raw = typeof value === "string" || typeof value === "number" ? String(value) : "";
  // Control characters other than line breaks and tabs are never meaningful in a form answer.
  const stripped = raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  return multiline ? stripped.replace(/\r\n?/g, "\n").replace(/\n{4,}/g, "\n\n\n").trim() : stripped.replace(/\s+/g, " ").trim();
}

function cleanValue(entry, value) {
  const result = text(value, entry.kind === "textarea");
  if (!result) return "";
  if (result.length > entry.max) throw new HttpError(400, `${entry.label} must be ${entry.max} characters or fewer.`);

  switch (entry.kind) {
    case "email": {
      const email = result.toLowerCase();
      if (!isEmail(email)) throw new HttpError(400, entry.requiredMessage || `${entry.label} must be a valid email address.`);
      return email;
    }
    case "phone":
      if (!PHONE_PATTERN.test(result) || result.replace(/\D/g, "").length < 7) {
        throw new HttpError(400, entry.requiredMessage || `${entry.label} must be a valid phone number.`);
      }
      return result;
    case "select":
      if (!entry.options.includes(result)) throw new HttpError(400, `Choose a valid option for ${entry.label}.`);
      return result;
    case "url":
      if (!/^https?:\/\/[^\s]+$/i.test(result)) throw new HttpError(400, `${entry.label} must start with https:// or http://.`);
      return result;
    default:
      return result;
  }
}

/**
 * Cleans a submission against a record type definition.
 * `partial` (admin edits) only touches the keys present in `input`.
 */
function cleanRecord(def, input, { partial = false, admin = false } = {}) {
  const source = input && typeof input === "object" && !Array.isArray(input) ? input : {};
  const data = {};

  for (const entry of def.fields) {
    if (partial && !(entry.key in source)) continue;
    const value = cleanValue(entry, source[entry.key]);
    if (entry.required && !value) throw new HttpError(400, entry.requiredMessage || `${entry.label} is required.`);
    data[entry.key] = value;
  }

  if (admin) {
    if (!partial || "status" in source) {
      const status = text(source.status) || def.statuses[0];
      if (!def.statuses.includes(status)) throw new HttpError(400, `Choose a valid status: ${def.statuses.join(", ")}.`);
      data.status = status;
    }
    if (!partial || "notes" in source) {
      const notes = text(source.notes, true);
      if (notes.length > NOTES_MAX) throw new HttpError(400, `Internal notes must be ${NOTES_MAX} characters or fewer.`);
      data.notes = notes;
    }
  }

  if (!partial || "sourcePage" in source) {
    const page = text(source.sourcePage).slice(0, SOURCE_MAX);
    data.sourcePage = page.startsWith("/") && !page.startsWith("//") ? page : "";
  }

  return data;
}

module.exports = { cleanRecord };
