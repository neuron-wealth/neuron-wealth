import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { CMS_ICONS } from "./cmsIcons";

export const EASE = [0.22, 1, 0.36, 1];
export const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";

export const visibleItems = (list) => (Array.isArray(list) ? list.filter((entry) => entry && entry.visible !== false) : []);
export const strings = (list) => (Array.isArray(list) ? list.filter((entry) => typeof entry === "string" && entry.trim()) : []);

const SAFE_HREF = /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i;
export const safeHref = (href) => (typeof href === "string" && SAFE_HREF.test(href.trim()) ? href.trim() : "");
export const hasLink = (link) => Boolean(safeHref(link?.href));
export const hasImage = (image) => Boolean(safeHref(image?.url));

const POSITIONS = { center: "center", top: "center top", bottom: "center bottom", left: "left center", right: "right center" };

/** Inline overrides for an <img>; width/height of 0 keep the section's automatic sizing. */
export function imageStyle(image, { sizing = true } = {}) {
  if (!image) return undefined;
  const style = {};
  if (sizing && image.width > 0) {
    style.width = `${image.width}px`;
    style.maxWidth = "100%";
  }
  if (sizing && image.height > 0) style.height = `${image.height}px`;
  if (image.fit) style.objectFit = image.fit;
  if (POSITIONS[image.position]) style.objectPosition = POSITIONS[image.position];
  return Object.keys(style).length ? style : undefined;
}

/** Fixed height for the box that frames an image, when the admin set one. */
export const boxHeight = (image) => (image?.height > 0 ? { height: `${image.height}px` } : undefined);

export function CmsLink({ link, href: rawHref, newTab, className = "", children, ...rest }) {
  const href = safeHref(rawHref ?? link?.href);
  const openNew = newTab ?? link?.newTab;
  const tabProps = openNew ? { target: "_blank", rel: "noopener noreferrer" } : {};
  if (!href) return <span className={className}>{children}</span>;
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className} {...tabProps} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} {...tabProps} {...rest}>
      {children}
    </a>
  );
}

export function CmsIcon({ name, className = "h-6 w-6" }) {
  const Icon = CMS_ICONS[name];
  return Icon ? <Icon className={className} aria-hidden="true" /> : null;
}

export function Reveal({ as = "div", children, className = "", delay = 0, y = 32 }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

export function Spotlight({ className = "", children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  function onMove(event) {
    const node = ref.current;
    if (!node || reduce) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={onMove} className={`group relative h-full overflow-hidden ${className}`}>
      {reduce ? null : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(84, 184, 72, 0.14), transparent 65%)",
          }}
        />
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}

export function Eyebrow({ children, light = false, center = false }) {
  if (!children) return null;
  return (
    <p
      className={`flex items-center gap-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] ${center ? "justify-center" : ""} ${
        light ? "text-[#8FCB86]" : "text-[#21649A]"
      }`}
    >
      <span aria-hidden="true" className={`h-px w-8 ${light ? "bg-[#8FCB86]" : "bg-[#54B848]"}`} />
      {children}
    </p>
  );
}

const PILL_STYLES = {
  solid: "bg-[#54B848] text-[#102A40] hover:bg-[#489e3e]",
  outline:
    "border border-[#21649A] bg-white text-[#15344F] hover:bg-[#15344F] hover:text-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-[#102A40]",
  light: "border border-white/40 text-white hover:bg-white hover:text-[#102A40]",
  blue: "bg-[#21649A] text-white hover:bg-[#1b5482]",
};

export function PillLink({ link, variant = "outline", className = "" }) {
  if (!hasLink(link) || !link.label) return null;
  return (
    <CmsLink
      link={link}
      className={`group/pill inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
        PILL_STYLES[variant] || PILL_STYLES.outline
      } ${FOCUS} ${className}`}
    >
      {link.label}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover/pill:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/pill:translate-x-0"
        aria-hidden="true"
      />
    </CmsLink>
  );
}

export function SectionHead({ eyebrow, title, id, text, action, light = false, align = "left" }) {
  if (!eyebrow && !title && !text && !action) return null;
  const center = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-5 ${center ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`}
    >
      <div className={`max-w-2xl ${center ? "mx-auto" : ""}`}>
        <Eyebrow light={light} center={center}>
          {eyebrow}
        </Eyebrow>
        {title ? (
          <h2
            id={id}
            className={`mt-3 font-display text-[2.1rem] leading-[1.1] sm:text-[2.6rem] ${
              light ? "text-white" : "text-[#15344F] dark:text-white"
            }`}
          >
            {title}
          </h2>
        ) : null}
        {text ? (
          <p className={`mt-3 text-lg leading-[1.6] ${light ? "text-white/80" : "text-[#5E6D7B] dark:text-slate-300"}`}>{text}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}

export function CountUp({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const match = String(value).match(/^([^0-9]*)([\d,]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const rawNum = match ? parseInt(match[2].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[3] : "";
  const hasComma = match && match[2].includes(",");

  useEffect(() => {
    if (rawNum === null || reduce) {
      setCount(rawNum ?? 0);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startTime = performance.now();
          const duration = 1600;

          const animate = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(progress < 1 ? Math.floor(ease * rawNum) : rawNum);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rawNum, reduce]);

  if (rawNum === null) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {hasComma ? count.toLocaleString("en-IN") : count}
      {suffix}
    </span>
  );
}
