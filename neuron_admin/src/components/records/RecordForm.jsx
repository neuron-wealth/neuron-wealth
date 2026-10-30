import { useState } from "react";
import Alert from "../ui/Alert";

const NOTES_MAX = 3000;
const INPUT_TYPES = { email: "email", phone: "tel", url: "url", text: "text" };

export function emptyRecord(type) {
  return {
    ...Object.fromEntries(type.fields.map((field) => [field.key, ""])),
    status: type.statuses[0],
    notes: "",
  };
}

export function recordValues(type, item) {
  return {
    ...Object.fromEntries(type.fields.map((field) => [field.key, item[field.key] || ""])),
    status: item.status || type.statuses[0],
    notes: item.notes || "",
  };
}

function Control({ id, field, value, onChange }) {
  const common = {
    id,
    name: field.key,
    value,
    required: field.required,
    maxLength: field.max,
    onChange: (event) => onChange(field.key, event.target.value),
  };

  if (field.kind === "select") {
    const options = value && !field.options.includes(value) ? [value, ...field.options] : field.options;
    return (
      <select {...common} className="field mt-1.5 cursor-pointer px-3.5">
        <option value="">{field.required ? "Choose an answer" : "Not answered"}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  if (field.kind === "textarea") {
    return <textarea {...common} rows={field.max > 3000 ? 6 : 4} className="field mt-1.5 h-auto resize-y px-3.5 py-2.5 leading-relaxed" />;
  }
  return <input {...common} type={INPUT_TYPES[field.kind] || "text"} className="field mt-1.5 px-3.5" autoComplete="off" />;
}

/** Edit or add form for one record type. Submit it with a button that has `form={formId}`. */
export default function RecordForm({ formId, type, initial, error, onSubmit }) {
  const [values, setValues] = useState(initial);
  const [problem, setProblem] = useState("");
  const set = (key, value) => setValues((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    const missing = type.fields.find((field) => field.required && !String(values[field.key] || "").trim());
    if (missing) {
      setProblem(`${missing.label} is required.`);
      document.getElementById(`${formId}-${missing.key}`)?.focus();
      return;
    }
    setProblem("");
    onSubmit(values);
  };

  const message = problem || error;

  return (
    <form id={formId} onSubmit={submit} noValidate className="space-y-4">
      {message ? <Alert tone="error">{message}</Alert> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {type.fields.map((field) => {
          const id = `${formId}-${field.key}`;
          const wide = field.kind === "textarea" || field.kind === "select" || field.label.length > 40;
          return (
            <div key={field.key} className={wide ? "sm:col-span-2" : ""}>
              <label htmlFor={id} className="field-label">
                {field.label}
                {field.required ? <span className="text-red-600 dark:text-red-400"> *</span> : null}
              </label>
              <Control id={id} field={field} value={values[field.key]} onChange={set} />
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-status`} className="field-label">
            Status
          </label>
          <select
            id={`${formId}-status`}
            value={values.status}
            onChange={(event) => set("status", event.target.value)}
            className="field mt-1.5 cursor-pointer px-3.5"
          >
            {type.statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-notes`} className="field-label">
            Internal Notes
          </label>
          <textarea
            id={`${formId}-notes`}
            value={values.notes}
            maxLength={NOTES_MAX}
            rows={3}
            onChange={(event) => set("notes", event.target.value)}
            placeholder="Follow-up notes for your team. Never shown on the website."
            className="field mt-1.5 h-auto resize-y px-3.5 py-2.5 leading-relaxed"
          />
        </div>
      </div>
    </form>
  );
}
