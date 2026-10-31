import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import Honeypot, { honeypotValue } from "../../common/Honeypot";
import { submitForm } from "../../../services/forms";
import { sectionDesign } from "../design";
import { Eyebrow, FOCUS, Reveal, hasImage, strings } from "../primitives";

const FIELD =
  "min-h-12 w-full rounded-full border border-white/25 bg-white px-5 text-[0.9375rem] text-[#18324A] placeholder:text-[#8AA0B3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54B848]";

export default function Callback({ id, content, design, root }) {
  const reduce = useReducedMotion();
  const look = sectionDesign(design, { background: "navy", spacing: "pt-12 pb-12 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-14" });
  const services = strings(content.services);
  const backgroundUrl = hasImage(content.image) ? content.image.url : "";
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const [form, setForm] = useState({ name: "", phone: "", service: services[0] || "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState("");
  const headingId = `${id}-heading`;

  useEffect(() => {
    if (reduce || !backgroundUrl) return undefined;
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return undefined;

    const wide = window.matchMedia("(min-width: 1200px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (wide.matches) {
        bg.style.clipPath = "";
        return;
      }
      const rect = section.getBoundingClientRect();
      const top = Math.max(0, rect.top);
      const right = Math.max(0, window.innerWidth - rect.right);
      const bottom = Math.max(0, window.innerHeight - rect.bottom);
      const left = Math.max(0, rect.left);
      bg.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;
    };

    const requestUpdate = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    wide.addEventListener("change", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      wide.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduce, backgroundUrl]);

  async function onSubmit(event) {
    event.preventDefault();
    if (sending) return;
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.name.trim() || phoneDigits.length < 7) {
      setError("Enter your name and a phone number.");
      const first = !form.name.trim() ? "name" : "phone";
      requestAnimationFrame(() => document.getElementById(`${id}-${first}`)?.focus());
      return;
    }
    const service = services.includes(form.service) ? form.service : services[0] || "";
    const website = honeypotValue(event.currentTarget);
    setSending(true);
    setError("");
    try {
      const message = await submitForm("callbacks", { name: form.name.trim(), phone: form.phone.trim(), service, website });
      setSent(message);
      setForm({ name: "", phone: "", service: services[0] || "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      {...root}
      ref={sectionRef}
      aria-labelledby={headingId}
      className={`relative isolate mb-0 ${look.background || "bg-[#102A40]"} ${look.spacing} text-white`}
      style={look.style}
    >
      {backgroundUrl ? (
        <>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat ${reduce ? "" : "max-[1199px]:hidden min-[1200px]:bg-fixed"}`}
            style={{ backgroundImage: `url("${backgroundUrl}")` }}
          />
          {reduce ? null : (
            <div
              ref={bgRef}
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat min-[1200px]:hidden"
              style={{ backgroundImage: `url("${backgroundUrl}")`, clipPath: "inset(100%)" }}
            />
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ background: "linear-gradient(90deg, rgba(16,42,64,0.82) 0%, rgba(16,42,64,0.62) 46%, rgba(16,42,64,0.38) 100%)" }}
          />
        </>
      ) : null}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
      </div>
      <form onSubmit={onSubmit} noValidate className="site-frame relative z-10 px-4 sm:px-6">
        <Reveal>
          <Eyebrow light>{content.eyebrow}</Eyebrow>
          <h2 id={headingId} className="mt-3 font-display text-[2.1rem] leading-[1.1] text-white sm:text-[2.6rem]">
            {content.title}
          </h2>
          {content.text ? <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-white/80 sm:text-base">{content.text}</p> : null}
        </Reveal>

        {sent ? (
          <Reveal delay={0.1}>
            <div role="status" className="mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8FCB86]" aria-hidden="true" />
              <div>
                <p className="text-[0.9375rem] font-semibold text-white">{sent}</p>
                <button
                  type="button"
                  onClick={() => setSent("")}
                  className={`mt-2 text-sm font-semibold text-[#8FCB86] underline underline-offset-2 hover:text-white ${FOCUS}`}
                >
                  Send another request
                </button>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <div className={`mt-8 grid gap-4 sm:grid-cols-2 lg:items-center ${services.length ? "lg:grid-cols-[1fr_1fr_1.35fr_auto]" : "lg:grid-cols-[1fr_1fr_auto]"}`}>
              <div>
                <label htmlFor={`${id}-name`} className="sr-only">
                  Name
                </label>
                <input
                  id={`${id}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={content.namePlaceholder || "Your Name"}
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  aria-invalid={Boolean(error) && !form.name.trim()}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={FIELD}
                />
              </div>
              <div>
                <label htmlFor={`${id}-phone`} className="sr-only">
                  Phone
                </label>
                <input
                  id={`${id}-phone`}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={content.phonePlaceholder || "Phone Number"}
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  aria-invalid={Boolean(error) && form.phone.replace(/\D/g, "").length < 7}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={FIELD}
                />
              </div>
              {services.length ? (
                <div className="relative">
                  <label htmlFor={`${id}-service`} className="sr-only">
                    Advisory service
                  </label>
                  <select
                    id={`${id}-service`}
                    name="service"
                    value={services.includes(form.service) ? form.service : services[0]}
                    onChange={(event) => setForm({ ...form, service: event.target.value })}
                    className={`${FIELD} appearance-none pr-11`}
                  >
                    {services.map((service) => (
                      <option key={service} value={service} className="text-[#18324A]">
                        {service}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#18324A]" aria-hidden="true" />
                </div>
              ) : null}
              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className={`inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#54B848] px-8 text-sm font-bold text-[#102A40] shadow-[0_16px_36px_-18px_rgba(84,184,72,0.9)] transition-all hover:bg-[#68C75B] disabled:cursor-wait disabled:opacity-80 ${FOCUS}`}
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                {sending ? "Sending…" : content.buttonLabel || "Send Request"}
              </button>
            </div>
            {error ? (
              <p id={`${id}-error`} role="alert" className="mt-3 text-sm text-[#F6D0D0]">
                {error}
              </p>
            ) : null}
          </Reveal>
        )}
        <Honeypot />
      </form>
    </section>
  );
}
