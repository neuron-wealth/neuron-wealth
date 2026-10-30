const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function layout({ heading, paragraphs, action }) {
  const body = paragraphs.map((text) => `<p style="margin:0 0 14px;color:#18324A;font-size:15px;line-height:1.6">${text}</p>`).join("");
  const button = action
    ? `<p style="margin:22px 0"><a href="${escapeHtml(action.url)}" style="display:inline-block;background:#21649A;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:10px">${escapeHtml(action.label)}</a></p>
       <p style="margin:0 0 14px;color:#5E6D7B;font-size:13px;line-height:1.6">If the button does not work, copy this link into your browser:<br><span style="word-break:break-all">${escapeHtml(action.url)}</span></p>`
    : "";

  return `<!doctype html><html><body style="margin:0;background:#F7F8F5;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #DCE4E8;border-radius:14px;overflow:hidden">
        <tr><td style="background:#102A40;padding:18px 26px;color:#ffffff;font-weight:700;font-size:16px">Neuron Wealth Advisors LLP · Admin</td></tr>
        <tr><td style="padding:26px">
          <h1 style="margin:0 0 16px;color:#102A40;font-size:20px">${escapeHtml(heading)}</h1>
          ${body}${button}
          <p style="margin:18px 0 0;color:#5E6D7B;font-size:12px;line-height:1.6">If you did not request this, you can ignore this email. Nothing changes until the link is used.</p>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function resetEmail({ purpose, username, url, minutes }) {
  const isPassword = purpose === "password";
  const heading = isPassword ? "Reset Your Admin Password" : "Your Admin Username";
  const lines = isPassword
    ? [
        "A password reset was requested for the Neuron admin console.",
        `Use the button below to choose a new password. The link expires in ${minutes} minutes and can be used once.`,
      ]
    : [
        "A username reminder was requested for the Neuron admin console.",
        `Your current username is <strong>${escapeHtml(username)}</strong>.`,
        `To change it, use the button below. The link expires in ${minutes} minutes and can be used once.`,
      ];
  const label = isPassword ? "Reset Password" : "Change Username";

  return {
    subject: isPassword ? "Neuron Admin: Password Reset Link" : "Neuron Admin: Username Reminder",
    html: layout({ heading, paragraphs: lines, action: { url, label } }),
    text: `${heading}\n\n${lines.join("\n").replace(/<[^>]+>/g, "")}\n\n${label}: ${url}`,
  };
}

function changedEmail({ purpose, username }) {
  const heading = purpose === "password" ? "Admin Password Changed" : "Admin Username Changed";
  const lines =
    purpose === "password"
      ? ["The password for the Neuron admin console was just changed. All existing sessions were signed out."]
      : [
          `The admin username was changed to <strong>${escapeHtml(username)}</strong>.`,
          "All existing sessions were signed out.",
        ];
  return {
    subject: `Neuron Admin: ${heading}`,
    html: layout({ heading, paragraphs: lines }),
    text: `${heading}\n\n${lines.join("\n").replace(/<[^>]+>/g, "")}`,
  };
}

/**
 * Layout for notification emails. `bodyHtml` must already be escaped. Visitor emails get a
 * plain brand header; admin emails are marked "Admin".
 */
function brandedEmail({ heading, bodyHtml, action, footer, audience = "admin" }) {
  const brand = audience === "admin" ? "Neuron Wealth Advisors LLP · Admin" : "Neuron Wealth Advisors LLP";
  const button = action
    ? `<p style="margin:22px 0 6px"><a href="${escapeHtml(action.url)}" style="display:inline-block;background:#21649A;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:10px">${escapeHtml(action.label)}</a></p>`
    : "";

  return `<!doctype html><html><body style="margin:0;background:#F7F8F5;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #DCE4E8;border-radius:14px;overflow:hidden">
        <tr><td style="background:#102A40;padding:18px 26px;color:#ffffff;font-weight:700;font-size:16px;border-bottom:3px solid #54B848">${escapeHtml(brand)}</td></tr>
        <tr><td style="padding:26px">
          <h1 style="margin:0 0 18px;color:#102A40;font-size:20px;line-height:1.35">${escapeHtml(heading)}</h1>
          ${bodyHtml}${button}
          ${footer ? `<p style="margin:22px 0 0;padding-top:14px;border-top:1px solid #E8EDF0;color:#5E6D7B;font-size:12px;line-height:1.6">${escapeHtml(footer)}</p>` : ""}
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

module.exports = { resetEmail, changedEmail, brandedEmail, escapeHtml };
