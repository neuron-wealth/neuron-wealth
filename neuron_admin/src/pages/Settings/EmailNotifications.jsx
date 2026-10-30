import { useEffect, useRef, useState } from "react";
import { AlertTriangle, BellRing, Inbox, RotateCcw, Save, Send } from "lucide-react";
import { Input, Toggle } from "../../components/site/controls";
import { Skeleton } from "../../components/ui/Skeleton";
import { useToast } from "../../context/ToastContext";
import { fetchEmailSettings, resetEmailTemplate, saveEmailSettings, sendTestEmail } from "../../services/notificationService";

const PLACEHOLDER_HELP = {
  formName: "Form name, e.g. Contact Enquiry",
  name: "Visitor's name",
  email: "Visitor's email",
  phone: "Visitor's phone",
  subject: "Subject / service / objective",
  details: "Table of every field the visitor filled in (put on its own line)",
  date: "Date and time (IST)",
  adminLink: "Link to the page in this admin console",
  postTitle: "Blog post title",
  postLink: "Link to the blog post",
  comment: "The visitor's comment (on its own line it shows as a quote)",
  reply: "Your reply (on its own line it shows as a quote)",
  replyBy: "Name the reply was posted under",
};

const AUDIENCE = { admin: "To you", visitor: "To the visitor" };

function TemplateEditor({ eventKey, meta, template, limits, onChange, onTest, onReset, testing }) {
  const bodyRef = useRef(null);
  const set = (changes) => onChange({ ...template, ...changes });

  // Inserts the placeholder where the cursor is in the message.
  const insert = (name) => {
    const token = `{{${name}}}`;
    const el = bodyRef.current;
    const start = el ? el.selectionStart : template.body.length;
    const end = el ? el.selectionEnd : template.body.length;
    const body = template.body.slice(0, start) + token + template.body.slice(end);
    set({ body });
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      el.setSelectionRange(start + token.length, start + token.length);
    });
  };

  return (
    <div className="space-y-5">
      <Toggle
        checked={template.enabled}
        onChange={(enabled) => set({ enabled })}
        label={template.enabled ? "This email is on" : "This email is off"}
        description={meta.description}
      />

      <fieldset disabled={!template.enabled} className={`space-y-4 transition-opacity ${template.enabled ? "" : "opacity-50"}`}>
        <Input label="Subject" value={template.subject} maxLength={limits.subject} onChange={(subject) => set({ subject })} />

        <div>
          <label htmlFor={`${eventKey}-body`} className="field-label">
            Message
          </label>
          <textarea
            id={`${eventKey}-body`}
            ref={bodyRef}
            rows={10}
            maxLength={limits.body}
            value={template.body}
            onChange={(event) => set({ body: event.target.value })}
            className="field mt-1.5 h-auto px-3.5 py-2.5 font-mono text-[0.8125rem] leading-relaxed"
          />
          <p className="muted mt-1 flex justify-between gap-2 text-xs">
            <span>Leave a blank line between paragraphs.</span>
            <span>
              {template.body.length}/{limits.body}
            </span>
          </p>
        </div>

        <div>
          <p className="field-label">Placeholders</p>
          <p className="muted mt-0.5 text-xs">Click one to insert it into the message. They are replaced with the real details when the email is sent.</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {meta.placeholders.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => insert(name)}
                title={PLACEHOLDER_HELP[name]}
                className="focus-ring rounded-lg border border-line bg-subtle px-2 py-1 font-mono text-xs font-semibold text-accent hover:border-accent"
              >
                {`{{${name}}}`}
              </button>
            ))}
          </div>
        </div>

        <Input label="Button Label" value={template.buttonLabel} maxLength={limits.buttonLabel} onChange={(buttonLabel) => set({ buttonLabel })} hint="Leave empty to send the email without a button." />
      </fieldset>

      <div className="flex flex-wrap gap-2 border-t border-line pt-4">
        <button type="button" onClick={onTest} disabled={testing || !template.enabled} className="btn btn-secondary focus-ring h-10 px-4">
          <Send className="h-4 w-4" aria-hidden="true" />
          {testing ? "Sending…" : "Send Test Email"}
        </button>
        <button type="button" onClick={onReset} className="btn btn-secondary focus-ring h-10 px-4">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Restore Default Wording
        </button>
      </div>
    </div>
  );
}

export default function EmailNotifications() {
  const { push } = useToast();
  const [data, setData] = useState(null);
  const [draft, setDraft] = useState(null);
  const [active, setActive] = useState("submission");
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");

  const load = (payload) => {
    setData(payload);
    setDraft(JSON.parse(JSON.stringify(payload.settings)));
  };

  useEffect(() => {
    fetchEmailSettings()
      .then(load)
      .catch((err) => setError(err.message));
  }, []);

  const dirty = data && draft && JSON.stringify(draft) !== JSON.stringify(data.settings);

  async function save() {
    setSaving(true);
    try {
      const payload = await saveEmailSettings(draft);
      load(payload);
      push(payload.message || "Email settings saved.", "success");
    } catch (err) {
      push(err.message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function test() {
    setTesting(true);
    try {
      const result = await sendTestEmail(active, draft.events[active]);
      push(result.message, "success");
    } catch (err) {
      push(err.message, "error");
    } finally {
      setTesting(false);
    }
  }

  async function reset() {
    if (!window.confirm("Restore the default wording for this email? Your saved changes to it will be replaced.")) return;
    try {
      const payload = await resetEmailTemplate(active);
      // Keep any other unsaved edits, but take the restored template.
      setData(payload);
      setDraft((current) => ({ ...current, events: { ...current.events, [active]: payload.settings.events[active] } }));
      push(payload.message, "success");
    } catch (err) {
      push(err.message, "error");
    }
  }

  return (
    <section className="panel overflow-hidden rounded-2xl" aria-labelledby="email-notifications-heading">
      <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-accent">
            <BellRing className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="email-notifications-heading" className="font-bold">
              Email Notifications
            </h2>
            <p className="muted mt-0.5 text-sm">Emails sent for form submissions, blog comments and your replies to commenters.</p>
          </div>
        </div>
        {draft ? (
          <button type="button" onClick={save} disabled={!dirty || saving} className="btn btn-primary focus-ring h-10 shrink-0 px-4">
            <Save className="h-4 w-4" aria-hidden="true" />
            {saving ? "Saving…" : dirty ? "Save Changes" : "Saved"}
          </button>
        ) : null}
      </div>

      {error ? <p className="p-6 text-sm font-semibold text-red-600 dark:text-red-400">{error}</p> : null}

      {!draft && !error ? (
        <div className="space-y-4 p-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : null}

      {draft ? (
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-3">
          <div className="space-y-5">
            {!data.mailConfigured ? (
              <p className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs font-semibold text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Email delivery is not configured on the server, so no emails are sent. Add the SMTP settings to the backend .env file.
              </p>
            ) : null}

            <div className="rounded-xl border border-line bg-subtle p-4">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Inbox className="h-4 w-4 text-accent" aria-hidden="true" />
                Notification Inbox
              </p>
              <Input
                className="mt-3"
                label="Send admin emails to"
                value={draft.recipients}
                maxLength={400}
                placeholder="you@example.com, team@example.com"
                onChange={(recipients) => setDraft({ ...draft, recipients })}
                hint={`Up to ${data.limits.recipients} addresses, separated by commas. Leave empty to use the account recovery inbox.`}
              />
            </div>

            <div role="tablist" aria-label="Emails" className="space-y-2">
              {Object.entries(data.events).map(([key, meta]) => {
                const selected = key === active;
                const on = draft.events[key].enabled;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(key)}
                    className={`focus-ring flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                      selected ? "border-accent bg-[var(--accent-soft)]" : "border-line hover:bg-subtle"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-bold">{meta.label}</span>
                      <span className="muted block text-xs">{AUDIENCE[meta.audience]}</span>
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[0.6875rem] font-bold ${
                        on ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-subtle text-soft"
                      }`}
                    >
                      {on ? "On" : "Off"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div role="tabpanel" aria-label={data.events[active].label} className="lg:col-span-2">
            <TemplateEditor
              key={active}
              eventKey={active}
              meta={data.events[active]}
              template={draft.events[active]}
              limits={data.limits}
              onChange={(template) => setDraft({ ...draft, events: { ...draft.events, [active]: template } })}
              onTest={test}
              onReset={reset}
              testing={testing}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
