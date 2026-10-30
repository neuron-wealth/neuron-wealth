/** Off-screen field people never fill in; the API quietly ignores submissions that include it. */
export default function Honeypot() {
  return (
    <div aria-hidden="true" inert style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export const honeypotValue = (form) => String(new FormData(form).get("website") || "");
