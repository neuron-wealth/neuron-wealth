// Turns website activity into admin notifications and emails. Every function here is
// fire-and-forget: a failed email or notification never breaks the visitor's request.
const env = require("../config/env");
const { RECORD_TYPES } = require("../config/recordTypes");
const notifications = require("./notificationService");
const emailSettings = require("./emailSettingsService");
const { isMailConfigured, sendMail } = require("./mailService");
const { HttpError } = require("../utils/http");

const ADMIN_PATHS = {
  enquiries: "/enquiries",
  callbacks: "/callbacks",
  assessments: "/assessments",
  subscribers: "/subscribers",
  careers: "/careers",
  comments: "/blogs/comments",
};

const adminUrl = (kind) => `${env.recovery.appUrl}${ADMIN_PATHS[kind] || "/"}`;
const postUrl = (blog, commentId) => `${env.siteUrl}/blog/${encodeURIComponent(blog.slug)}${commentId ? `#comment-${commentId}` : ""}`;
const formatDate = (value) =>
  new Date(value || Date.now()).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }) + " IST";

async function deliver(eventKey, to, vars, extras) {
  if (!isMailConfigured()) return console.warn(`[Notify] SMTP is not configured; "${eventKey}" email skipped.`);
  const settings = await emailSettings.getSettings();
  const template = settings.events[eventKey];
  if (!template.enabled) return;
  const recipients = to === "admin" ? emailSettings.recipientList(settings) : [to];
  const email = emailSettings.renderEmail(eventKey, template, vars, extras);
  await sendMail({ to: recipients.join(", "), ...email });
  console.log(`[Notify] "${eventKey}" email sent to ${recipients.length} recipient(s).`);
}

function safely(label, task) {
  Promise.resolve()
    .then(task)
    .catch((error) => console.error(`[Notify] ${label} failed:`, error.message));
}

function submissionVars(key, item) {
  const def = RECORD_TYPES[key];
  const details = def.fields.map((field) => ({ label: field.label, value: String(item[field.key] || "").trim() }));
  if (item.sourcePage) details.push({ label: "Submitted From", value: item.sourcePage });
  const vars = {
    formName: def.label,
    name: item.name || item.email || "a visitor",
    email: item.email || "",
    phone: item.phone || item.mobile || "",
    subject: item.subject || item.service || item.objective || item.role || "",
    date: formatDate(item.createdAt),
    adminLink: adminUrl(key),
    details: "",
  };
  return { vars, details };
}

/** A visitor submitted one of the website forms. */
function submission(key, item) {
  const def = RECORD_TYPES[key];
  const { vars, details } = submissionVars(key, item);
  const topic = def.columns.topic ? item[def.columns.topic] : "";
  safely(`${def.label} notification`, () =>
    notifications.create({
      kind: key,
      title: `New ${def.label}`,
      message: [item[def.columns.primary], topic].filter(Boolean).join(" · "),
      link: ADMIN_PATHS[key],
    })
  );
  safely(`${def.label} email`, () => deliver("submission", "admin", vars, { details, actionUrl: vars.adminLink }));
}

/** A visitor commented on a blog post (it waits for approval). */
function comment(blog, entry) {
  const vars = {
    postTitle: blog.title,
    name: entry.authorName,
    email: entry.authorEmail,
    comment: entry.content,
    date: formatDate(),
    adminLink: adminUrl("comments"),
    postLink: postUrl(blog),
  };
  safely("comment notification", () =>
    notifications.create({ kind: "comments", title: "New Blog Comment", message: `${entry.authorName} on "${blog.title}"`, link: ADMIN_PATHS.comments })
  );
  safely("comment email", () => deliver("comment", "admin", vars, { actionUrl: vars.adminLink }));
}

/** The admin replied to a visitor's comment: email the visitor, if they left an address. */
function reply(blog, parent, entry) {
  if (!parent.authorEmail || parent.byAdmin) return;
  const vars = {
    name: parent.authorName,
    postTitle: blog.title,
    comment: parent.content,
    reply: entry.content,
    replyBy: entry.authorName,
    postLink: postUrl(blog, entry.id),
  };
  safely("reply email", () => deliver("reply", parent.authorEmail, vars, { actionUrl: vars.postLink }));
}

/** Sample data so the admin can preview each email in their own inbox. */
const SAMPLES = {
  submission: () => {
    const item = { name: "Priya Shah", email: "priya@example.com", organization: "Shah Family Office", subject: "Returning to India next year", message: "We are moving back from California in March and would like advice on our 401(k) and RSUs.", sourcePage: "/contact", createdAt: new Date() };
    const { vars, details } = submissionVars("enquiries", item);
    return { vars, extras: { details, actionUrl: vars.adminLink } };
  },
  comment: () => {
    const vars = { postTitle: "TCS on Foreign Remittances", name: "Rahul Mehta", email: "rahul@example.com", comment: "Does the TCS apply to remittances to my own NRE account?", date: formatDate(), adminLink: adminUrl("comments"), postLink: `${env.siteUrl}/blog` };
    return { vars, extras: { actionUrl: vars.adminLink } };
  },
  reply: () => {
    const vars = { name: "Rahul Mehta", postTitle: "TCS on Foreign Remittances", comment: "Does the TCS apply to remittances to my own NRE account?", reply: "Transfers between your own resident and NRE accounts are not foreign remittances, so TCS does not apply.", replyBy: "Neuron Wealth", postLink: `${env.siteUrl}/blog` };
    return { vars, extras: { actionUrl: vars.postLink } };
  },
};

/** Sends a sample of one email to the notification inbox, using the given (possibly unsaved) template. */
async function sendTest(eventKey, template) {
  if (!SAMPLES[eventKey]) throw new HttpError(404, "Unknown email.");
  if (!isMailConfigured()) throw new HttpError(503, "Email delivery is not configured on the server (SMTP settings in the backend .env).");
  const settings = await emailSettings.getSettings();
  const merged = { ...settings.events[eventKey], ...(template || {}) };
  const { vars, extras } = SAMPLES[eventKey]();
  const email = emailSettings.renderEmail(eventKey, merged, vars, extras);
  const recipients = emailSettings.recipientList(settings);
  await sendMail({ to: recipients.join(", "), ...email, subject: `[Test] ${email.subject}` });
  return recipients;
}

module.exports = { submission, comment, reply, sendTest, ADMIN_PATHS };
