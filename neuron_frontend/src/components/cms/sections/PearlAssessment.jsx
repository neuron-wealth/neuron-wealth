import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  HeartHandshake,
  Loader2,
  Send,
} from "lucide-react";
import { FOCUS } from "../primitives";
import Honeypot, { honeypotValue } from "../../common/Honeypot";
import { submitForm } from "../../../services/forms";

const EMPTY_FORM = {
  email: "",
  name: "",
  mobile: "",
  q1_advisors_current: "",
  q2_advisors_10_years: "",
  q3_tax_advisors_10_years: "",
  q4_primary_objective: "",
  q5_primary_reason: "",
  additional_info: "",
};

export default function PearlAssessment({ id, content, design, root }) {
  const eyebrow = content.eyebrow || "Partnership Assessment";
  const title = content.title || "Interested in Becoming a";
  const highlight = content.highlight || "Pearl?";
  const intro =
    content.intro ||
    "We are always looking forward to associate with great human beings and guide them to better protect and manage their family wealth, increase risk adjusted after-tax return, sustain it for multiple generations and have a fulfilling and satisfied financial life while complying with applicable laws.";
  const subtext =
    content.subtext ||
    "Please answer following 5 questions for us to better understand your requirements and if we can have a long lasting mutually beneficial association.";

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepError, setStepError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (stepError) setStepError("");
  };

  const handleNextStep = (e) => {
    e?.preventDefault?.();
    setStepError("");

    if (currentStep === 1) {
      if (!formData.email?.trim() || !formData.email.includes("@")) {
        setStepError("Please provide a valid email address.");
        return;
      }
      if (!formData.name?.trim()) {
        setStepError("Please provide your name.");
        return;
      }
      if (!formData.mobile?.trim()) {
        setStepError("Please provide your mobile number.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.q1_advisors_current) {
        setStepError("Please answer Question 1 (Current advisors / agents).");
        return;
      }
      if (!formData.q2_advisors_10_years) {
        setStepError("Please answer Question 2 (Advisors in last 10 years).");
        return;
      }
      if (!formData.q3_tax_advisors_10_years) {
        setStepError("Please answer Question 3 (Tax advisors in last 10 years).");
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setStepError("");
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep !== 3) {
      handleNextStep(e);
      return;
    }
    if (sending) return;

    if (!formData.q4_primary_objective) {
      setStepError("Please choose your Primary Objective (Question 4).");
      return;
    }
    if (!formData.q5_primary_reason) {
      setStepError("Please choose your Primary Reason for Association (Question 5).");
      return;
    }
    setStepError("");

    const website = honeypotValue(e.currentTarget);
    setSending(true);
    try {
      await submitForm("assessments", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        advisorsNow: formData.q1_advisors_current,
        advisorsDecade: formData.q2_advisors_10_years,
        taxAdvisorsDecade: formData.q3_tax_advisors_10_years,
        objective: formData.q4_primary_objective,
        reason: formData.q5_primary_reason,
        additionalInfo: formData.additional_info.trim(),
        website,
      });
      setSubmitted(true);
      setFormData(EMPTY_FORM);
    } catch (err) {
      setStepError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id={id || "pearl-form"}
      {...root}
      className="relative isolate scroll-mt-[var(--header-height,4.875rem)] overflow-hidden bg-white py-16 dark:bg-[#102A40] sm:py-20 lg:py-24"
    >
      {/* Background Decorative Waves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-[#54B848]/[0.05] blur-3xl dark:bg-[#54B848]/[0.08]" />

        <svg
          className="absolute inset-0 h-full w-full opacity-100 dark:opacity-85"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="multiColorCurveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#54B848" stopOpacity="1" />
              <stop offset="18%" stopColor="#00C2CB" stopOpacity="1" />
              <stop offset="38%" stopColor="#2563EB" stopOpacity="1" />
              <stop offset="62%" stopColor="#8B5CF6" stopOpacity="1" />
              <stop offset="82%" stopColor="#EC4899" stopOpacity="1" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="multiColorCurveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#54B848" stopOpacity="0.35" />
              <stop offset="18%" stopColor="#00C2CB" stopOpacity="0.35" />
              <stop offset="38%" stopColor="#2563EB" stopOpacity="0.35" />
              <stop offset="62%" stopColor="#8B5CF6" stopOpacity="0.35" />
              <stop offset="82%" stopColor="#EC4899" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="curveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#54B848" stopOpacity="0.06" />
              <stop offset="50%" stopColor="#2563EB" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <path
            d="M-100,680 C360,520 620,840 1080,620 C1320,500 1520,700 1600,640 L1600,1000 L-100,1000 Z"
            fill="url(#curveGrad2)"
          />

          <path
            d="M-100,680 C360,520 620,840 1080,620 C1320,500 1520,700 1600,640"
            stroke="url(#multiColorCurveGlow)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M-100,680 C360,520 620,840 1080,620 C1320,500 1520,700 1600,640"
            stroke="url(#multiColorCurveStroke)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          <path
            d="M-50,620 C340,460 700,740 1120,520 C1340,420 1460,560 1550,500"
            stroke="url(#multiColorCurveGlow)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M-50,620 C340,460 700,740 1120,520 C1340,420 1460,560 1550,500"
            stroke="url(#multiColorCurveStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="site-frame relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-left sm:text-center">
            {eyebrow && (
              <p className="inline-flex items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[#21649A] dark:text-[#8FCB86]">
                <HeartHandshake className="h-4 w-4" />
                {eyebrow}
              </p>
            )}
            <h2 className="mt-3 font-display text-[2.3rem] font-medium leading-[1.1] tracking-tight text-[#15344F] dark:text-white sm:text-[3rem]">
              {title} <span className="italic text-[#21649A] dark:text-[#8FCB86]">{highlight}</span>
            </h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {intro && <p>{intro}</p>}
              {subtext && <p className="font-medium text-[#18324A] dark:text-white">{subtext}</p>}
            </div>
          </div>

          {/* Form Container */}
          {submitted ? (
            <div className="mt-12 rounded-3xl border-2 border-[#54B848]/50 bg-[#EEF8EC] p-8 text-center shadow-lg dark:bg-[#153b23]/30 sm:p-12">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#2E933C] dark:text-[#8FCB86]" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-[#15344F] dark:text-white">
                Thank You for Your Trust
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                Your assessment responses have been received. Our founding advisory partners will review them with strict fiduciary confidentiality and reach out promptly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  setStepError("");
                }}
                className={`mt-6 inline-flex rounded-full bg-[#21649A] px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#185382] ${FOCUS}`}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative mt-8 overflow-hidden rounded-3xl border-2 border-[#21649A]/30 bg-white p-6 shadow-[0_20px_50px_-15px_rgba(16,42,64,0.12),0_0_0_1px_rgba(33,100,154,0.06)] transition-all duration-300 hover:border-[#21649A]/50 dark:border-white/20 dark:bg-[#0c1828] sm:p-9"
            >
              {/* Decorative Top Accent Gradient Bar */}
              <div
                className="absolute -top-[2px] left-0 right-0 h-[4px] bg-gradient-to-r from-[#21649A] via-[#54B848] to-[#21649A]"
                aria-hidden="true"
              />

              {/* Wizard Progress Tracker */}
              <div className="mb-6 border-b border-[#E8EBE6] pb-5 dark:border-white/10">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#21649A] font-mono text-[0.6875rem] font-bold text-white shadow-sm dark:bg-[#8FCB86] dark:text-[#061524]">
                      {currentStep}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#15344F] dark:text-white">
                      {currentStep === 1
                        ? "Step 1 of 3: Contact Details"
                        : currentStep === 2
                        ? "Step 2 of 3: Advisory Experience (Q1–Q3)"
                        : "Step 3 of 3: Fitment & Objectives (Q4–Q5)"}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#54B848] dark:text-[#8FCB86]">
                    {currentStep === 1 ? "33%" : currentStep === 2 ? "66%" : "100%"}
                  </span>
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#21649A] via-[#54B848] to-[#54B848]"
                    initial={false}
                    animate={{
                      width:
                        currentStep === 1 ? "33.33%" : currentStep === 2 ? "66.66%" : "100%",
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  />
                </div>

                {/* Step Quick Navigation Tabs */}
                <div className="mt-3.5 grid grid-cols-3 gap-2">
                  {[
                    { step: 1, title: "1. Contact" },
                    { step: 2, title: "2. Experience" },
                    { step: 3, title: "3. Objectives" },
                  ].map((s) => (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => {
                        if (s.step < currentStep) {
                          setCurrentStep(s.step);
                          setStepError("");
                        }
                      }}
                      disabled={s.step > currentStep}
                      className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 text-[0.6875rem] font-semibold transition-all ${
                        currentStep === s.step
                          ? "border border-[#21649A]/30 bg-[#21649A]/10 text-[#21649A] shadow-sm dark:border-[#8FCB86]/40 dark:bg-[#8FCB86]/15 dark:text-[#8FCB86]"
                          : s.step < currentStep
                          ? "cursor-pointer bg-slate-50 text-[#15344F] hover:bg-slate-100 dark:bg-white/5 dark:text-slate-300"
                          : "cursor-not-allowed text-slate-400 opacity-50 dark:text-slate-600"
                      }`}
                    >
                      {s.step < currentStep ? (
                        <Check className="h-3 w-3 text-[#54B848]" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      )}
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Validation Error Hint */}
              {stepError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/90 px-4 py-2.5 text-xs font-semibold text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                  <span>{stepError}</span>
                </motion.div>
              )}

              {/* Step Content Screens */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#15344F] dark:text-white">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Your Email"
                        className="w-full rounded-xl border border-[#D5DFE6] bg-slate-50/60 px-4 py-2.5 text-sm text-[#15344F] placeholder-slate-400 outline-none transition-all focus:border-[#21649A] focus:bg-white focus:ring-2 focus:ring-[#21649A]/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder-slate-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#15344F] dark:text-white">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your Name"
                          className="w-full rounded-xl border border-[#D5DFE6] bg-slate-50/60 px-4 py-2.5 text-sm text-[#15344F] placeholder-slate-400 outline-none transition-all focus:border-[#21649A] focus:bg-white focus:ring-2 focus:ring-[#21649A]/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder-slate-500"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#15344F] dark:text-white">
                          Mobile <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          placeholder="Your Mobile Number"
                          className="w-full rounded-xl border border-[#D5DFE6] bg-slate-50/60 px-4 py-2.5 text-sm text-[#15344F] placeholder-slate-400 outline-none transition-all focus:border-[#21649A] focus:bg-white focus:ring-2 focus:ring-[#21649A]/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder-slate-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-2 block text-xs sm:text-sm font-semibold text-[#15344F] dark:text-white">
                        No. of investment advisors or mutual fund distributors / agents currently working with <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {["0", "1", "2", "3 or more"].map((opt) => (
                          <label
                            key={opt}
                            className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                              formData.q1_advisors_current === opt
                                ? "border-[#21649A] bg-[#21649A]/10 font-bold text-[#21649A] dark:border-[#8FCB86] dark:bg-[#8FCB86]/10 dark:text-[#8FCB86]"
                                : "border-[#E8EBE6] bg-white text-[#5E6D7B] hover:border-[#21649A]/30 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="q1"
                              value={opt}
                              checked={formData.q1_advisors_current === opt}
                              onChange={(e) =>
                                handleInputChange("q1_advisors_current", e.target.value)
                              }
                              className="sr-only"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs sm:text-sm font-semibold text-[#15344F] dark:text-white">
                        No. of investment advisors or agents you have worked with during last 10 years (including current): <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {["0 - 1", "2 - 3", "4 - 5", "6 or more"].map((opt) => (
                          <label
                            key={opt}
                            className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                              formData.q2_advisors_10_years === opt
                                ? "border-[#21649A] bg-[#21649A]/10 font-bold text-[#21649A] dark:border-[#8FCB86] dark:bg-[#8FCB86]/10 dark:text-[#8FCB86]"
                                : "border-[#E8EBE6] bg-white text-[#5E6D7B] hover:border-[#21649A]/30 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="q2"
                              value={opt}
                              checked={formData.q2_advisors_10_years === opt}
                              onChange={(e) =>
                                handleInputChange("q2_advisors_10_years", e.target.value)
                              }
                              className="sr-only"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs sm:text-sm font-semibold text-[#15344F] dark:text-white">
                        No. of CAs or tax advisors you have worked with during last 10 years (including current): <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {["0 - 1", "2 - 3", "4 - 5", "6 or more"].map((opt) => (
                          <label
                            key={opt}
                            className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                              formData.q3_tax_advisors_10_years === opt
                                ? "border-[#21649A] bg-[#21649A]/10 font-bold text-[#21649A] dark:border-[#8FCB86] dark:bg-[#8FCB86]/10 dark:text-[#8FCB86]"
                                : "border-[#E8EBE6] bg-white text-[#5E6D7B] hover:border-[#21649A]/30 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="q3"
                              value={opt}
                              checked={formData.q3_tax_advisors_10_years === opt}
                              onChange={(e) =>
                                handleInputChange("q3_tax_advisors_10_years", e.target.value)
                              }
                              className="sr-only"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-2 block text-xs sm:text-sm font-semibold text-[#15344F] dark:text-white">
                        Primary (No. 1) objective of associating with us: <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {[
                          "Becoming rich, faster",
                          "Maximizing return",
                          "Optimizing tax and better after-tax return",
                          "Managing and Sustaining Wealth",
                          "Streamline investments, compliance and finances",
                        ].map((opt) => (
                          <label
                            key={opt}
                            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-2.5 text-xs sm:text-sm font-medium transition-all ${
                              formData.q4_primary_objective === opt
                                ? "border-[#21649A] bg-[#21649A]/5 font-semibold text-[#15344F] dark:border-[#8FCB86] dark:bg-[#8FCB86]/10 dark:text-white"
                                : "border-[#E8EBE6] bg-white text-[#5E6D7B] hover:border-[#21649A]/30 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="q4"
                              value={opt}
                              checked={formData.q4_primary_objective === opt}
                              onChange={(e) =>
                                handleInputChange("q4_primary_objective", e.target.value)
                              }
                              className="h-3.5 w-3.5 shrink-0 accent-[#21649A] dark:accent-[#8FCB86]"
                            />
                            <span className="leading-snug">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs sm:text-sm font-semibold text-[#15344F] dark:text-white">
                        Primary (No. 1) Reason why NWA should associate with you: <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {[
                          "I have money",
                          "I have reputation",
                          "I have connections",
                          "NWA can better manage my wealth, taxes and compliance",
                          "NWA can simplify financial life for me and/or my family",
                          "Both are good at heart and can grow together",
                        ].map((opt) => (
                          <label
                            key={opt}
                            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-2.5 text-xs sm:text-sm font-medium transition-all ${
                              formData.q5_primary_reason === opt
                                ? "border-[#21649A] bg-[#21649A]/5 font-semibold text-[#15344F] dark:border-[#8FCB86] dark:bg-[#8FCB86]/10 dark:text-white"
                                : "border-[#E8EBE6] bg-white text-[#5E6D7B] hover:border-[#21649A]/30 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="q5"
                              value={opt}
                              checked={formData.q5_primary_reason === opt}
                              onChange={(e) =>
                                handleInputChange("q5_primary_reason", e.target.value)
                              }
                              className="h-3.5 w-3.5 shrink-0 accent-[#21649A] dark:accent-[#8FCB86]"
                            />
                            <span className="leading-snug">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#15344F] dark:text-white">
                        Any other information that you think will help us better understand the purpose of the association
                      </label>
                      <textarea
                        rows={2}
                        value={formData.additional_info}
                        onChange={(e) =>
                          handleInputChange("additional_info", e.target.value)
                        }
                        placeholder="Your answer (optional)"
                        className="w-full rounded-xl border border-[#D5DFE6] bg-slate-50/60 p-3 text-sm text-[#15344F] placeholder-slate-400 outline-none transition-all focus:border-[#21649A] focus:bg-white focus:ring-2 focus:ring-[#21649A]/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder-slate-500"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Multi-Step Action Navigation */}
              <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#E8EBE6] pt-5 dark:border-white/10">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className={`inline-flex items-center gap-1.5 rounded-full border border-[#D5DFE6] bg-white px-5 py-2 text-xs font-semibold text-[#15344F] transition-all hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white ${FOCUS}`}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <p className="hidden text-[0.6875rem] text-[#5E6D7B] dark:text-slate-400 sm:block">
                    Protected under strict SEBI RIA fiduciary confidentiality
                  </p>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`inline-flex items-center gap-2 rounded-full bg-[#21649A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#185382] hover:shadow-lg ${FOCUS}`}
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className={`inline-flex items-center gap-2 rounded-full bg-[#54B848] px-7 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#061524] shadow-md transition-all hover:bg-[#8FCB86] hover:shadow-lg disabled:cursor-wait disabled:opacity-80 ${FOCUS}`}
                  >
                    <span>{sending ? "Submitting…" : "Submit Assessment"}</span>
                    {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                  </button>
                )}
              </div>
              <Honeypot />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
