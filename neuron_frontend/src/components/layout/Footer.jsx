import { useState } from "react";
import { ArrowUpRight, ArrowRight, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { phoneHref, useSiteSettings, visibleOnly } from "../../hooks/useSiteSettings";
import { NAV_ICONS } from "../../config/navIcons";
import { submitForm } from "../../services/forms";
import Honeypot, { honeypotValue } from "../common/Honeypot";
import Logo from "../common/Logo";
import PendingLink from "../common/PendingLink";
import SocialLinks, { useSocialLinks } from "../common/SocialLinks";
import { cx } from "../../utils/cx";

const TEXT_90 = "text-[color:color-mix(in_srgb,var(--ft-text)_90%,transparent)]";
const TEXT_75 = "text-[color:color-mix(in_srgb,var(--ft-text)_75%,transparent)]";
const TEXT_70 = "text-[color:color-mix(in_srgb,var(--ft-text)_70%,transparent)]";
const TEXT_65 = "text-[color:color-mix(in_srgb,var(--ft-text)_65%,transparent)]";

const COLUMN_HEADING =
  "font-display text-[1.2rem] font-medium leading-none text-[color:var(--ft-text)] after:mt-3 after:block after:h-0.5 after:w-8 after:rounded-full after:bg-[color:var(--ft-accent)]";

const NAV_LINK = cx(
  "group inline-flex items-center gap-1.5 text-[0.875rem] transition-colors hover:text-[color:var(--ft-text)] focus-ring-inverse",
  TEXT_75,
);

function LinkColumn({ column }) {
  const links = visibleOnly(column.links).map((link) => ({ ...link, available: true }));
  if (!links.length) return null;
  return (
    <div>
      <h3 className={COLUMN_HEADING}>{column.heading}</h3>
      <ul className="mt-5 space-y-2.5">
        {links.map((item) => {
          const Icon = item.icon ? NAV_ICONS[item.icon] : null;
          return (
            <li key={item.id}>
              <PendingLink item={item} className={NAV_LINK}>
                {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 text-[color:var(--ft-accent-soft)]" aria-hidden="true" /> : null}
                <span>{item.label}</span>
                <ArrowUpRight
                  className="h-3 w-3 -translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-70"
                  aria-hidden="true"
                />
              </PendingLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SubscribeForm({ subscribe }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState({ tone: "", text: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;
    const website = honeypotValue(event.currentTarget);
    setSending(true);
    setNotice({ tone: "", text: "" });
    try {
      const message = await submitForm("subscribers", { email: email.trim(), website });
      setNotice({ tone: "success", text: message });
      setEmail("");
    } catch (err) {
      setNotice({ tone: "error", text: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full lg:max-w-md" data-a11y-skip>
      <h3 className="font-display text-[1.2rem] font-medium text-[color:var(--ft-text)]">{subscribe.heading}</h3>
      {subscribe.text ? <p className={cx("mt-2 text-[0.875rem]", TEXT_70)}>{subscribe.text}</p> : null}
      <form onSubmit={handleSubmit} className="relative mt-4 flex flex-col gap-2 sm:flex-row">
        <Honeypot />
        <label htmlFor="footer-subscribe-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-subscribe-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 w-full min-w-0 rounded-full border border-white/15 bg-white/5 px-5 sm:h-11 sm:flex-1 text-[0.875rem] text-[color:var(--ft-text)] placeholder:text-[color:color-mix(in_srgb,var(--ft-text)_45%,transparent)] focus:border-[color:var(--ft-accent-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ft-accent-soft)]"
        />
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--ft-accent)] px-6 sm:h-11 text-[0.875rem] font-semibold text-[color:var(--ft-bg)] transition-colors hover:bg-[color:var(--ft-accent-soft)] focus-ring-inverse disabled:cursor-wait disabled:opacity-80"
        >
          {subscribe.buttonLabel}
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          )}
        </button>
      </form>
      <p
        role="status"
        className={cx(
          "text-[0.8125rem]",
          notice.text ? "mt-2" : "sr-only",
          notice.tone === "error" ? "text-[#F6B8B8]" : "text-[color:var(--ft-accent-soft)]",
        )}
      >
        {notice.text}
      </p>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const footer = useSiteSettings("footer");
  const hasSocial = useSocialLinks().length > 0;
  const { colors, address, contact, bottom, subscribe } = footer;
  const columns = footer.columns.filter((column) => visibleOnly(column.links).length);
  const [firstLine, ...otherLines] = address.lines;
  const showSubscribe = subscribe.enabled;

  const PhoneIcon = (contact.phoneIcon && NAV_ICONS[contact.phoneIcon]) || Phone;
  const EmailIcon = (contact.emailIcon && NAV_ICONS[contact.emailIcon]) || Mail;
  const AddressIcon = (address.icon && NAV_ICONS[address.icon]) || MapPin;

  const style = {
    "--ft-bg": colors.background,
    "--ft-bottom": colors.bottomBar,
    "--ft-text": colors.text,
    "--ft-accent": colors.accent,
    "--ft-accent-soft": colors.accentSoft,
  };

  return (
    <footer
      id="site-footer"
      style={style}
      className="relative mt-auto w-full overflow-hidden bg-[color:var(--ft-bg)] font-manrope text-[color:var(--ft-text)]"
    >
      <div className="h-1 w-full bg-gradient-to-r from-[#21649A] via-[color:var(--ft-accent)] to-[#21649A]" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-[#21649A]/20 blur-3xl" />
        <div className="absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-[#54B848]/10 blur-3xl" />
      </div>

      <div className="site-frame relative px-4 pt-12 pb-10 sm:px-6 sm:pt-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <Logo forceDark imgClassName="!h-14 sm:!h-16 w-auto" />
            {footer.description ? (
              <p className={cx("mt-5 text-[0.90625rem] leading-relaxed", TEXT_70)}>{footer.description}</p>
            ) : null}
          </div>
          {showSubscribe ? <SubscribeForm subscribe={subscribe} /> : null}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-white/10 pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="border-b border-white/10 pb-10 lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            {address.heading ? (
              <h3 className={COLUMN_HEADING}>
                <span className="inline-flex items-center gap-2">
                  <AddressIcon className="h-4 w-4 shrink-0 text-[color:var(--ft-accent-soft)]" aria-hidden="true" />
                  <span>{address.heading}</span>
                </span>
              </h3>
            ) : null}
            {address.lines.length ? (
              <address className={cx("mt-5 not-italic text-[0.875rem] leading-relaxed", TEXT_75)}>
                <span className="mb-1 block font-semibold text-[color:var(--ft-text)]">{firstLine}</span>
                {otherLines.map((line, index) => (
                  <span key={`${index}-${line}`} className="block">
                    {line}
                  </span>
                ))}
              </address>
            ) : null}

            {contact.phone || contact.email ? (
              <ul className="mt-5 space-y-2 border-t border-white/10 pt-5 text-[0.875rem] font-medium">
                {contact.phone ? (
                  <li>
                    <a
                      href={phoneHref(contact.phone)}
                      className={cx("inline-flex items-center gap-2.5 transition-colors hover:text-[color:var(--ft-text)] focus-ring-inverse", TEXT_90)}
                    >
                      <PhoneIcon className="h-4 w-4 shrink-0 text-[color:var(--ft-accent-soft)]" aria-hidden="true" />
                      {contact.phone}
                    </a>
                  </li>
                ) : null}
                {contact.email ? (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className={cx("inline-flex items-center gap-2.5 transition-colors hover:text-[color:var(--ft-text)] focus-ring-inverse", TEXT_90)}
                    >
                      <EmailIcon className="h-4 w-4 shrink-0 text-[color:var(--ft-accent-soft)]" aria-hidden="true" />
                      {contact.email}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:flex lg:justify-between lg:gap-10 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1" data-a11y-skip>
            {columns.map((column) => (
              <LinkColumn key={column.id} column={column} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-[color:var(--ft-bottom)]">
        <div className="site-frame flex flex-col items-center gap-4 px-4 py-5 text-center sm:flex-row sm:justify-between sm:px-6 sm:py-4 sm:text-left">
          <p className={cx("text-[0.84375rem]", TEXT_65)}>
            © {year} {bottom.copyright}. All rights reserved.
          </p>
          {bottom.showSocial && hasSocial ? (
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3" data-a11y-skip>
              {bottom.socialLabel ? (
                <span className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--ft-accent-soft)]">
                  {bottom.socialLabel}
                </span>
              ) : null}
              <SocialLinks className="flex-nowrap sm:-mr-2" />
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
