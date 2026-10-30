import { useState } from "react";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import { company } from "../../../config/site";
import { socialIcons } from "../../common/SocialIcons";
import { useSocialLinks } from "../../common/SocialLinks";
import Honeypot, { honeypotValue } from "../../common/Honeypot";
import { submitForm } from "../../../services/forms";

const DEFAULT_MAPS_URL =
  "https://www.google.com/maps/search/Mauryansh+Elanza+Nr.Parekh's+Hospital,,+Shyamal+Crossroad+Shyamal+Ahmedabad,+Gujarat+380015/@23.012939,72.529865,1603m/data=!3m1!1e3?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D";

const DEFAULT_WHATSAPP_URL =
  "https://wa.me/919099942563?text=Hello%20Neuron%20Wealth%20Advisors%2C%20I%20would%20like%20to%20inquire%20about%20your%20fiduciary%20wealth%20advisory%20services.";

export default function ContactHub({ id, content, design, root }) {
  const socialChannels = useSocialLinks();

  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setReady(false);
    setServerError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Enter a subject.";
    if (!form.message.trim()) next.message = "Please describe your advisory enquiry.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    setServerError("");
    setReady(false);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      organization: form.organization.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    try {
      await submitForm("enquiries", { ...payload, website: honeypotValue(event.currentTarget) });
      setSubmittedName(payload.name);
      setReady(true);
      setForm({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Advisory enquiry submission error:", err);
      setServerError(
        err.message ||
          "Unable to send enquiry to server right now. Please check your connection or email info@neuronwealth.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Editable Content Fields
  const formBadge = content?.formBadge || "Fiduciary Consultation Desk";
  const formTitle = content?.formTitle || "Start a Confidential Advisory Conversation";
  const formDescription =
    content?.formDescription ||
    "Thank you for your interest. Please fill out the form below to inquire about our fiduciary wealth advisory services.";
  const formNote =
    content?.formNote || "Your inquiry is protected by statutory SEBI fiduciary discretion and never shared.";
  const formButton = content?.formButton || "Send Fiduciary Inquiry";

  const deskBadge = content?.deskBadge || "SEBI Registered Investment Adviser";
  const regNumber = content?.regNumber || "Reg. No: INA000016481 • Non-Individual";
  const companyName = content?.companyName || company.name || "Neuron Wealth Advisors LLP";
  const validity = content?.validity || "Validity: Perpetual; until cancelled";

  const officerDeskTitle = content?.officerDeskTitle || "Principal Officer Desk";
  const officerName = content?.officerName || "Mr. Jigar Patel";
  const officerCredentials = content?.officerCredentials || "CA (India), CFA (USA), CPA (USA), MBA-Finance (USA)";
  const officerEmail = content?.officerEmail || "jigar@neuronwealth.com";
  const whatsappUrl = content?.whatsappUrl || DEFAULT_WHATSAPP_URL;

  const headquartersTitle = content?.headquartersTitle || "Headquarters:";
  const headquartersAddress =
    content?.headquartersAddress ||
    "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, B/s. Parekhs Hospital, Satellite, Ahmedabad-380015, Gujarat, India.";
  const mapsUrl = content?.mapsUrl || DEFAULT_MAPS_URL;

  const sebiOfficeTitle = content?.sebiOfficeTitle || "SEBI Western Regional Office (WRO)";
  const sebiOfficeAddress =
    content?.sebiOfficeAddress ||
    "SEBI Bhavan, Panchvati 1st Lane, Gulbai Tekra Road, Ahmedabad-380006, Gujarat, India";

  const directPhone = content?.directPhone || company.phoneDisplay || "+91 90999 42563";
  const officialEmail = content?.officialEmail || company.email || "info@neuronwealth.com";
  const bottomBgImage = content?.bottomBgImage?.url || "/images/mission-dark-bg.jpg";

  return (
    <section id={id || "contact-hub"} {...root} className="bg-white py-12 dark:bg-[#0c1828] sm:py-16">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-14">
          {/* Left Column: Interactive Fiduciary Enquiry Form (7 cols) */}
          <div className="flex flex-col lg:col-span-7">
            <div className="border-b border-slate-200 pb-5 dark:border-white/10">
              {formBadge ? (
                <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-[#1B6198] dark:text-sky-400">
                  <ShieldCheck className="h-4 w-4 text-[#54B848]" />
                  {formBadge}
                </span>
              ) : null}
              <h2 className="mt-1.5 font-display text-2xl font-bold leading-tight text-[#15344F] dark:text-white sm:text-3xl">
                {formTitle}
              </h2>
              {formDescription ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {formDescription}
                </p>
              ) : null}
            </div>

            {/* Form Inputs */}
            <form id="contact-form" className="relative mt-8 flex flex-1 flex-col space-y-4" onSubmit={submit} noValidate>
              {/* Row 1: Full Name & E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <User className="h-4 w-4" />
                    </span>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => setField("name", event.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#104b75] focus:outline-none focus:ring-2 focus:ring-[#104b75]/15 dark:border-white/15 dark:bg-[#102A40] dark:text-white dark:placeholder:text-slate-400 transition-colors"
                      aria-invalid={Boolean(errors.name)}
                    />
                  </div>
                  {errors.name ? (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    E-mail Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) => setField("email", event.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#104b75] focus:outline-none focus:ring-2 focus:ring-[#104b75]/15 dark:border-white/15 dark:bg-[#102A40] dark:text-white dark:placeholder:text-slate-400 transition-colors"
                      aria-invalid={Boolean(errors.email)}
                    />
                  </div>
                  {errors.email ? (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Row 2: Organization / Family Office */}
              <div>
                <label htmlFor="contact-organization" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Organization / Family Office <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <input
                    id="contact-organization"
                    name="organization"
                    autoComplete="organization"
                    value={form.organization}
                    onChange={(event) => setField("organization", event.target.value)}
                    placeholder="e.g. Sharma Family Office"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#104b75] focus:outline-none focus:ring-2 focus:ring-[#104b75]/15 dark:border-white/15 dark:bg-[#102A40] dark:text-white dark:placeholder:text-slate-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Subject */}
              <div>
                <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Subject / Topic of Enquiry <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={(event) => setField("subject", event.target.value)}
                  placeholder="e.g. NRI Returning to India / Family CFO Advisory"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#104b75] focus:outline-none focus:ring-2 focus:ring-[#104b75]/15 dark:border-white/15 dark:bg-[#102A40] dark:text-white dark:placeholder:text-slate-400 transition-colors"
                  aria-invalid={Boolean(errors.subject)}
                />
                {errors.subject ? (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.subject}
                  </p>
                ) : null}
              </div>

              {/* Row 4: Describe Briefly (grows so the form matches the desk panel height) */}
              <div className="flex flex-1 flex-col">
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Advisory Overview & Objectives <span className="text-red-500">*</span>
                </label>
                <div className="relative flex flex-1 flex-col">
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(event) => setField("message", event.target.value)}
                    placeholder="Please share details regarding your timeline, portfolio objectives, or specific advisory questions..."
                    className="min-h-[7.5rem] w-full flex-1 rounded-xl border border-slate-300 bg-white p-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#104b75] focus:outline-none focus:ring-2 focus:ring-[#104b75]/15 dark:border-white/15 dark:bg-[#102A40] dark:text-white dark:placeholder:text-slate-400 transition-colors resize-none"
                    aria-invalid={Boolean(errors.message)}
                  />
                </div>
                {errors.message ? (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              {/* Fiduciary Discretion Reassurance */}
              {formNote ? (
                <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                  <Lock className="h-3.5 w-3.5 text-[#54B848] shrink-0" />
                  <span>{formNote}</span>
                </div>
              ) : null}

              {/* Server Error Alert */}
              {serverError ? (
                <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800 dark:text-red-200">Unable to submit</p>
                    <p className="mt-0.5">{serverError}</p>
                  </div>
                </div>
              ) : null}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#104b75] hover:bg-[#155e94] px-8 text-sm font-bold text-white shadow-sm transition-all hover:shadow cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>{formButton}</span>
                    </>
                  )}
                </button>
              </div>

              {ready ? (
                <div className="flex items-start gap-3 rounded-xl border border-emerald-200/90 bg-emerald-50 p-4 text-sm font-semibold text-[#1F7A3A] dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-emerald-900 dark:text-emerald-200">
                      Inquiry Successfully Submitted!
                    </p>
                    <p className="mt-1 text-xs font-normal leading-relaxed text-emerald-800 dark:text-emerald-300">
                      Thank you{submittedName ? `, ${submittedName}` : ""}. Your confidential advisory enquiry has been received by our advisory desk. We will contact you at your email shortly.
                    </p>
                  </div>
                </div>
              ) : null}
              <Honeypot />
            </form>
          </div>

          {/* Right Column: Executive Advisory Desk in Square Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-none border-2 border-[#1B6198]/40 bg-white p-6 sm:p-7 dark:border-sky-400/30 dark:bg-[#102A40]/50 shadow-[0_16px_40px_-24px_rgba(27,97,152,0.18)]">
              {/* SEBI RIA Verified Plaque */}
              <div className="pb-4 border-b border-[#1B6198]/20 dark:border-white/10">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[0.6875rem] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  {deskBadge}
                </span>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {regNumber}
                </p>
              </div>

              {/* Company & Regulatory Details */}
              <div className="mt-5 space-y-4 text-sm sm:text-[0.9375rem] leading-relaxed text-slate-700 dark:text-slate-300">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-[#15344F] dark:text-white">
                    {companyName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {validity}
                  </p>
                </div>

                {/* Principal Officer Profile */}
                <div className="rounded-xl border border-[#1B6198]/25 bg-white p-3.5 dark:border-white/10 dark:bg-[#0c1828]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1B6198] dark:text-sky-400">
                    {officerDeskTitle}
                  </div>
                  <div className="mt-1 font-bold text-slate-900 dark:text-white text-sm sm:text-[0.9375rem]">
                    {officerName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {officerCredentials}
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
                    <a
                      href={company.phoneHref}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                    >
                      <Phone className="h-3 w-3 text-[#1B6198]" /> Call Direct
                    </a>
                    {whatsappUrl ? (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-800 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300"
                      >
                        <MessageSquare className="h-3 w-3 text-emerald-600" /> WhatsApp
                      </a>
                    ) : null}
                    {officerEmail ? (
                      <a
                        href={`mailto:${officerEmail}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                      >
                        <Mail className="h-3 w-3 text-sky-600" /> Email Officer
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Registered Headquarters Address */}
                <div className="space-y-1 text-xs sm:text-[0.8125rem]">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {headquartersTitle}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {headquartersAddress}
                  </p>
                  {mapsUrl ? (
                    <div className="pt-1">
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B6198] dark:text-sky-400 hover:underline"
                      >
                        <span>Get Directions</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  ) : null}
                </div>

                {/* Official Channels with Official Logos */}
                <div className="pt-1">
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Official Channels
                  </span>
                  <ul className="mt-2.5 flex items-center gap-2.5">
                    {socialChannels.map((item) => {
                      const Icon = socialIcons[item.platform];
                      const isEmail = item.url.startsWith("mailto:");
                      return (
                        <li key={item.id}>
                          <a
                            href={item.url}
                            target={isEmail ? undefined : "_blank"}
                            rel={isEmail ? undefined : "noopener noreferrer"}
                            aria-label={isEmail ? item.label : `${item.label} (opens in a new tab)`}
                            className="group inline-flex items-center justify-center transition-transform hover:scale-110"
                          >
                            <Icon />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* SEBI Regional Office (WRO) */}
                <div className="pt-2 border-t border-[#1B6198]/20 dark:border-white/10 space-y-1 text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-[0.6875rem]">
                    {sebiOfficeTitle}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sebiOfficeAddress}
                  </p>
                </div>
              </div>

              {/* Official Call & Email at Bottom with Dark Image Background */}
              <div className="flex-1" aria-hidden="true" />
              <div className="relative -mx-6 -mb-6 mt-6 overflow-hidden border-t-2 border-[#1B6198]/40 p-5 sm:-mx-7 sm:-mb-7 sm:p-6 dark:border-sky-400/30">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none" aria-hidden="true">
                  <img
                    src={bottomBgImage}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#061524]/95 via-[#061524]/85 to-[#0b243d]/80" />
                  <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-[#54B848]/20 blur-xl" />
                </div>

                <div className="relative z-10 flex flex-col gap-3.5 sm:gap-4">
                  {/* Direct Phone */}
                  <a
                    href={`tel:${directPhone.replace(/\s+/g, "")}`}
                    aria-label={`Call ${directPhone}`}
                    className="group flex items-center gap-3.5 transition-transform"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/15 text-emerald-400 shadow-[0_2px_12px_rgba(74,222,128,0.25)] transition-all duration-200 group-hover:scale-105 group-hover:border-emerald-400/60 group-hover:bg-emerald-500/25 group-hover:text-emerald-300">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-emerald-300/80">
                        Direct Advisory Line
                      </span>
                      <span className="text-base sm:text-lg font-medium tracking-wide text-white transition-colors group-hover:text-emerald-300">
                        {directPhone}
                      </span>
                    </div>
                  </a>

                  {/* Official Email */}
                  <a
                    href={`mailto:${officialEmail}`}
                    aria-label={`Email ${officialEmail}`}
                    className="group flex items-center gap-3.5 transition-transform"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/15 text-sky-400 shadow-[0_2px_12px_rgba(56,189,248,0.25)] transition-all duration-200 group-hover:scale-105 group-hover:border-sky-400/60 group-hover:bg-sky-500/25 group-hover:text-sky-300">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-sky-300/80">
                        Official Email
                      </span>
                      <span className="text-base sm:text-lg font-medium tracking-wide text-sky-200 transition-colors group-hover:text-white">
                        {officialEmail}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
