const fs = require("fs");
const path = require("path");
const { dataDir } = require("../config/env");
const { RECORD_KEYS } = require("../config/recordTypes");

function readJson(fileName, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path.join(dataDir, fileName), "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(fileName, value) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, fileName), JSON.stringify(value, null, 2));
}

function readRecords() {
  const parsed = readJson("records.json", {});
  return Object.fromEntries(RECORD_KEYS.map((key) => [key, Array.isArray(parsed[key]) ? parsed[key] : []]));
}

function writeRecords(store) {
  writeJson("records.json", store);
}

module.exports = { readJson, writeJson, readRecords, writeRecords };
