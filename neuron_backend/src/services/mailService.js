const nodemailer = require("nodemailer");
const env = require("../config/env");

let transporter = null;

function isMailConfigured() {
  return Boolean(env.smtp.host && env.smtp.user && env.smtp.pass && env.smtp.from);
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    });
  }
  return transporter;
}

async function sendMail({ to, subject, text, html }) {
  if (!isMailConfigured()) throw new Error("SMTP is not configured.");
  return getTransporter().sendMail({ from: env.smtp.from, to, subject, text, html });
}

module.exports = { isMailConfigured, sendMail };
