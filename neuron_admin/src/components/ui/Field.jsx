import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export const TextField = forwardRef(function TextField({ id, label, icon: Icon, hint, className = "", ...inputProps }, ref) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative mt-1.5">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" aria-hidden="true" />
        ) : null}
        <input ref={ref} id={id} className={`field ${Icon ? "pl-10" : "pl-3.5"} pr-3.5`} aria-describedby={hint ? `${id}-hint` : undefined} {...inputProps} />
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="muted mt-1.5 text-xs">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export const PasswordField = forwardRef(function PasswordField({ id, label, hint, className = "", ...inputProps }, ref) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative mt-1.5">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" aria-hidden="true" />
        <input
          ref={ref}
          id={id}
          type={visible ? "text" : "password"}
          className="field pl-10 pr-11"
          aria-describedby={hint ? `${id}-hint` : undefined}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="focus-ring absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-soft hover:text-ink"
        >
          {visible ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="muted mt-1.5 text-xs">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export function SubmitButton({ busy, busyLabel, disabled = false, children, className = "" }) {
  return (
    <button type="submit" disabled={busy || disabled} className={`btn btn-primary focus-ring h-12 w-full ${className}`}>
      {busy ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
          {busyLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
