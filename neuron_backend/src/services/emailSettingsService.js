const { hasDB } = require("../config/db");
const env = require("../config/env");
const AppMeta = require("../models/AppMeta");
const { readJson, writeJson } = require("../utils/fileStore");
const { HttpError } = require("../utils/http");
const { isEmail } = require("../utils/validators");
const { brandedEmail, escapeHtml } = require("./emailTemplates");

const META_KEY = "email-settings";
const FILE = "emailSettings.json";
const LIMITS = { subject: 200, body: 5000, buttonLabel: 60, recipients: 5 };

// Editable emails. `placeholders` documents what each template may use.
const EVENTS = {
  submission: {
    label: "New form submission",
    audience: "admin",
    description: "Sent to the notification inbox whenever someone submits a website form.",
    placeholders: ["formName", "name", "email", "phone", "subject", "details", "date", "adminLink"],
    defaults: {
      enabled: true,
      subject: "New {{formName}} from {{name}}",
      body: "A new {{formName}} was submitted on the website on {{date}}.\n\n{{details}}\n\nOpen the admin console to review it and update its status.",
      buttonLabel: "View in Admin",
    },
  },
  comment: {
    label: "New blog comment",
    audience: "admin",
    description: "Sent to the notification inbox when a visitor comments on a blog post.",
    placeholders: ["postTitle", "name", "email", "comment", "date", "adminLink", "postLink"],
    defaults: {
      enabled: true,
      subject: 'New comment on "{{postTitle}}"',
      body: '{{name}} ({{email}}) commented on "{{postTitle}}" on {{date}}:\n\n{{comment}}\n\nThe comment is waiting for approval. Approve it or reply from the admin console.',
      buttonLabel: "Review Comment",
    },
  },
  reply: {
    label: "Reply to a commenter",
    audience: "visitor",
    description: "Sent to the visitor when the admin replies to their blog comment.",
    placeholders: ["name", "postTitle", "comment", "reply", "replyBy", "postLink"],
    defaults: {
      enabled: true,
      subject: '{{replyBy}} replied to your comment on "{{postTitle}}"',
      body: 'Hello {{name}},\n\nThank you for your comment on "{{postTitle}}". {{replyBy}} from Neuron Wealth Advisors has replied:\n\n{{reply}}\n\nYour comment:\n\n{{comment}}\n\nYou can read the full conversation on our website.',
      buttonLabel: "View the Conversation",
    },
  },
};

const FOOTERS = {
  admin: "You are receiving this because you are listed as the notification inbox in the Neuron admin console (Settings → Email Notifications).",
  visitor: "You received this email because you commented on the Neuron Wealth Advisors blog. Investments in securities market are subject to market risks.",
};

function defaults() {
  return {
    recipients: "",
    events: Object.fromEntries(Object.entries(EVENTS).map(([key, def]) => [key, { ...def.defaults }])),
  };
}

function merge(stored) {
  const base = defaults();
  if (!stored || typeof stored !== "object") return base;
  return {
    recipients: typeof stored.recipients === "string" ? stored.recipients : base.recipients,
    events: Object.fromEntries(Object.keys(EVENTS).map((key) => [key, { ...base.events[key], ...(stored.events?.[key] || {}) }])),
  };
}

async function readStored() {
  if (hasDB()) {
    const doc = await AppMeta.findOne({ key: META_KEY }).lean();
    if (doc) return doc.value;
  }
  return readJson(FILE, null);
}

async function getSettings() {
  return merge(await readStored());
}

/** Where admin notifications go: the saved list, otherwise the account recovery inbox. */
function recipientList(settings) {
  const list = String(settings.recipients || "")
    .split(/[,;\s]+/)
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return list.length ? list : [env.recovery.email];
}

function cleanText(value, label, max, { required = false } = {}) {
  const text = String(value ?? "").replace(/\r\n/g, "\n").trim();
  if (required && !text) throw new HttpError(400, `${label} is required.`);
  if (text.length > max) throw new HttpError(400, `${label} must be ${max} characters or fewer.`);
  return text;
}

async function updateSettings(input) {
  const current = await getSettings();
  const recipients = cleanText(input?.recipients, "Notification inbox", 400);
  const list = recipients.split(/[,;\s]+/).filter(Boolean);
  if (list.length > LIMITS.recipients) throw new HttpError(400, `Add at most ${LIMITS.recipients} email addresses.`);
  const invalid = list.find((entry) => !isEmail(entry));
  if (invalid) throw new HttpError(400, `"${invalid}" is not a valid email address.`);

  const events = {};
  for (const [key, def] of Object.entries(EVENTS)) {
    const incoming = input?.events?.[key] || {};
    const prev = current.events[key];
    events[key] = {
      enabled: incoming.enabled === undefined ? prev.enabled : Boolean(incoming.enabled),
      subject: incoming.subject === undefined ? prev.subject : cleanText(incoming.subject, `${def.label} subject`, LIMITS.subject, { required: true }),
      body: incoming.body === undefined ? prev.body : cleanText(incoming.body, `${def.label} message`, LIMITS.body, { required: true }),
      buttonLabel: incoming.buttonLabel === undefined ? prev.buttonLabel : cleanText(incoming.buttonLabel, `${def.label} button label`, LIMITS.buttonLabel),
    };
  }

  const next = { recipients: list.join(", "), events };
  if (hasDB()) await AppMeta.updateOne({ key: META_KEY }, { $set: { value: next } }, { upsert: true });
  writeJson(FILE, next);
  return next;
}

async function resetEvent(key) {
  if (!EVENTS[key]) throw new HttpError(404, "Unknown email.");
  const current = await getSettings();
  return updateSettings({ recipients: current.recipients, events: { ...current.events, [key]: { ...EVENTS[key].defaults } } });
}

/* ------------------------------- rendering ------------------------------- */

const PLACEHOLDER = /\{\{\s*([a-zA-Z]+)\s*\}\}/g;
const fill = (template, vars) => template.replace(PLACEHOLDER, (match, name) => (vars[name] === undefined ? match : String(vars[name])));
const lineBreaks = (html) => html.replace(/\n/g, "<br>");

function detailsTable(details) {
  const rows = details
    .filter((row) => row.value)
    .map(
      (row) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #E8EDF0;color:#5E6D7B;font-size:13px;vertical-align:top;width:38%">${escapeHtml(row.label)}</td>` +
        `<td style="padding:8px 12px;border-bottom:1px solid #E8EDF0;color:#18324A;font-size:14px;font-weight:600">${lineBreaks(escapeHtml(row.value))}</td></tr>`
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;border:1px solid #E8EDF0;border-radius:10px;border-collapse:separate;overflow:hidden">${rows}</table>`;
}

const QUOTE_STYLE = "margin:0 0 14px;padding:12px 16px;border-left:3px solid #54B848;background:#F7F8F5;color:#18324A;font-size:15px;line-height:1.6;border-radius:0 8px 8px 0";
const PARA_STYLE = "margin:0 0 14px;color:#18324A;font-size:15px;line-height:1.6";
const QUOTED = new Set(["comment", "reply"]);

/**
 * Turns an editable template into a finished email. The admin's text and every visitor value are
 * escaped; {{details}} becomes a table, and {{comment}} / {{reply}} on their own line become quotes.
 */
function renderEmail(eventKey, template, vars, { details = [], actionUrl = "" } = {}) {
  const audience = EVENTS[eventKey].audience;
  const subject = fill(template.subject, vars).replace(/\s+/g, " ").trim();
  const paragraphs = template.body.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);

  const htmlParts = paragraphs.map((part) => {
    const only = part.match(/^\{\{\s*([a-zA-Z]+)\s*\}\}$/)?.[1];
    if (only === "details") return detailsTable(details);
    if (only && QUOTED.has(only)) return `<p style="${QUOTE_STYLE}">${lineBreaks(escapeHtml(vars[only] || ""))}</p>`;
    const escaped = escapeHtml(part).replace(PLACEHOLDER, (match, name) => (vars[name] === undefined ? match : lineBreaks(escapeHtml(vars[name]))));
    return `<p style="${PARA_STYLE}">${lineBreaks(escaped)}</p>`;
  });

  const detailsText = details.filter((row) => row.value).map((row) => `${row.label}: ${row.value}`).join("\n");
  const textBody = paragraphs.map((part) => (part.trim() === "{{details}}" ? detailsText : fill(part, vars))).join("\n\n");
  const action = actionUrl && template.buttonLabel ? { url: actionUrl, label: template.buttonLabel } : null;

  return {
    subject,
    html: brandedEmail({ heading: subject, bodyHtml: htmlParts.join(""), action, footer: FOOTERS[audience], audience }),
    text: `${textBody}${action ? `\n\n${action.label}: ${action.url}` : ""}\n\n${FOOTERS[audience]}`,
  };
}

function eventCatalog() {
  return Object.fromEntries(
    Object.entries(EVENTS).map(([key, def]) => [key, { label: def.label, audience: def.audience, description: def.description, placeholders: def.placeholders }])
  );
}

module.exports = { EVENTS, LIMITS, getSettings, updateSettings, resetEvent, recipientList, renderEmail, eventCatalog };
