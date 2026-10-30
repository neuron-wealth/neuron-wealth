import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { sectionDesign } from "../design";
import { useIsMobile } from "../../../hooks/useMediaQuery";
import { CmsLink, FOCUS, Reveal, SectionHead, hasImage, hasLink, imageStyle, strings, visibleItems } from "../primitives";

const SIDE_ARROW =
  "absolute z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#DCE4E8] bg-white text-[#21649A] shadow-[0_4px_16px_rgba(16,42,64,0.14)] transition-all duration-200 hover:scale-105 hover:border-[#21649A] hover:bg-[#21649A] hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-20 dark:border-white/15 dark:bg-[#102A40] dark:text-white dark:hover:border-[#54B848] dark:hover:bg-[#54B848] cursor-pointer";

// Pushes the arrows out into the page margin when there is room; on narrower screens they sit on the faded edge.
const ARROW_OFFSET = "calc(-1 * clamp(0rem, (100vw - min(100vw, var(--site-bar))) / 2 + 1.5rem - 3.25rem, 5.5rem))";

// Fades whichever edge still has members scrolled out of view.
function edgeMask(left, right) {
  const mask = `linear-gradient(to right, ${left ? "transparent 0, #000 6rem" : "#000 0"}, ${
    right ? "#000 calc(100% - 6rem), transparent 100%" : "#000 100%"
  })`;
  return { maskImage: mask, WebkitMaskImage: mask };
}

function stepOf(el) {
  return el.children.length >= 2 ? el.children[1].offsetLeft - el.children[0].offsetLeft : 240;
}

function Leader({ content }) {
  const [failed, setFailed] = useState(false);
  const image = content.leaderImage;
  const credentials = strings(content.leaderCredentials);
  const sized = image?.width > 0 || image?.height > 0;
  const frameStyle = sized
    ? {
        ...(image.width > 0 ? { width: `${image.width}px`, maxWidth: "100%" } : {}),
        ...(image.height > 0 ? { height: `${image.height}px`, maxHeight: "none", aspectRatio: "auto" } : {}),
      }
    : undefined;

  return (
    <Reveal>
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col justify-center lg:col-span-7">
          {content.leaderEyebrow ? (
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-[#54B848]">{content.leaderEyebrow}</p>
          ) : null}
          {content.leaderQuote ? (
            <blockquote className="mt-5 font-display text-[1.35rem] italic leading-[1.55] text-[#15344F] dark:text-white sm:text-[1.55rem] lg:text-[1.75rem]">
              <span className="mr-1.5 font-display text-4xl leading-none text-[#54B848]">"</span>
              {content.leaderQuote}
              <span className="ml-1.5 font-display text-4xl leading-none text-[#54B848]">"</span>
            </blockquote>
          ) : null}
          <div className="mt-8 border-t border-[#E8EBE6] pt-6 dark:border-white/10">
            <p className="font-display text-[1.65rem] tracking-tight text-[#15344F] dark:text-white" style={{ fontStyle: "italic" }}>
              {content.leaderName}
            </p>
            {content.leaderRole ? (
              <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-[#21649A] dark:text-sky-300">{content.leaderRole}</p>
            ) : null}
          </div>
          {credentials.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {credentials.map((credential) => (
                <span
                  key={credential}
                  className="rounded-full border border-[#54B848]/40 bg-[#54B848]/10 px-3.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-[#21649A] dark:border-[#54B848]/30 dark:text-emerald-300"
                >
                  {credential}
                </span>
              ))}
            </div>
          ) : null}
          {content.leaderBio ? <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#5E6D7B] dark:text-slate-300">{content.leaderBio}</p> : null}
        </div>

        <div className="flex h-full justify-center lg:col-span-5 lg:justify-end">
          <div
            className="relative aspect-[4/5] w-full max-w-[17rem] overflow-hidden rounded-none bg-[#E8EBE6] shadow-xl dark:bg-[#15344F] sm:max-w-[20rem] lg:aspect-auto lg:h-full lg:min-h-[340px] lg:max-w-[420px]"
            style={frameStyle}
          >
            {hasImage(image) && !failed ? (
              <img
                src={image.url}
                alt={image.alt || content.leaderName || ""}
                className="h-full w-full object-cover object-top"
                style={imageStyle(image, { sizing: false })}
                onError={() => setFailed(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#15344F] text-white">
                <span className="font-display text-[3.5rem] opacity-60">{content.leaderInitials}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const FACE = "absolute inset-0 overflow-hidden rounded-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

function MemberCard({ person, onSelect }) {
  const [failed, setFailed] = useState(false);
  const hasPhoto = hasImage(person.image) && !failed;

  return (
    <article className="flex w-full shrink-0 snap-center flex-col items-center px-2 text-center sm:w-[17.5rem] sm:snap-align-none sm:px-0 lg:w-[calc((100%_-_4.5rem)_/_4)]">
      <div className="relative h-48 w-48 shrink-0 rounded-full border border-[#54B848] p-2.5">
        <span aria-hidden="true" className="absolute right-[1.35rem] top-[0.55rem] z-10 h-3 w-3 rounded-full bg-[#54B848]" />
        <button
          type="button"
          onClick={() => onSelect(person)}
          aria-label={`View profile of ${person.name}`}
          className={`group/flip block h-full w-full cursor-pointer rounded-full [perspective:1000px] ${FOCUS}`}
        >
          <span className="relative block h-full w-full rounded-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)] group-focus-visible/flip:[transform:rotateY(180deg)] motion-reduce:transition-none">
            <span className={`${FACE} bg-gradient-to-br from-[#0B1E30] via-[#15344F] to-[#21649A]`}>
              {hasPhoto ? (
                <img
                  src={person.image.url}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                  style={imageStyle(person.image, { sizing: false })}
                  onError={() => setFailed(true)}
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-display text-[2.2rem] tracking-wide text-white">{person.initials}</span>
              )}
            </span>
            <span
              className={`${FACE} flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-[#15344F] via-[#1b4a6e] to-[#21649A] px-6 text-white [transform:rotateY(180deg)]`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#54B848] text-white shadow-md">
                <Eye className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.16em]">View Profile</span>
              {person.highlight ? <span className="text-[0.75rem] leading-snug text-white/80">{person.highlight}</span> : null}
            </span>
          </span>
        </button>
      </div>

      <p className="mt-6 flex min-h-[2.2em] items-center text-[0.6875rem] font-bold uppercase leading-snug tracking-[0.16em] text-[#54B848]">{person.role}</p>
      <h3 className="mt-1 font-display text-[1.4rem] font-medium leading-tight text-[#15344F] dark:text-white">{person.name}</h3>
      {person.bio ? <p className="mt-3 text-[0.875rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300">{person.bio}</p> : null}
    </article>
  );
}

function MemberModal({ member, teamLink, onClose }) {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const paragraphs = strings(member.fullBio).length
    ? strings(member.fullBio)
    : [member.bio || "Experienced wealth advisory specialist providing strategic portfolio governance and wealth management solutions."];
  const credentials = strings(member.credentials);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="member-modal-title">
      <div className="fixed inset-0 bg-[#07131F]/80 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />
      <div className="relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#DCE4E8] bg-white shadow-[0_25px_70px_rgba(16,42,64,0.35)] transition-all duration-300 dark:border-white/10 dark:bg-[#0B1E30]">
        <div className="h-2 w-full bg-gradient-to-r from-[#21649A] via-[#54B848] to-[#8FCB86]" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-[#15344F] shadow-sm transition-all hover:bg-slate-100 hover:text-black dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:right-6 sm:top-6"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto p-6 [scrollbar-width:thin] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-[#54B848] shadow-md ring-4 ring-emerald-500/15 sm:h-28 sm:w-28">
              {hasImage(member.image) ? (
                <img src={member.image.url} alt={member.image.alt || member.name} className="h-full w-full object-cover object-top" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#102A40] via-[#15344F] to-[#21649A] text-white">
                  <span className="font-display text-2xl font-bold tracking-wider">{member.initials}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col pr-8">
              <span className="inline-block self-start rounded-full bg-[#54B848]/15 px-3 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-[#21649A] dark:text-emerald-300">
                {member.role}
              </span>
              <h2 id="member-modal-title" className="mt-2 font-display text-2xl font-bold tracking-tight text-[#15344F] dark:text-white sm:text-3xl">
                {member.name}
              </h2>
              {member.highlight ? <p className="mt-1 text-xs font-semibold text-[#54B848]">{member.highlight}</p> : null}
            </div>
          </div>

          {credentials.length ? (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-[#E8EBE6] pt-5 dark:border-white/10">
              {credentials.map((credential, index) => (
                <span
                  key={index}
                  className="rounded-full border border-[#54B848]/30 bg-[#54B848]/10 px-3 py-1 text-[0.71875rem] font-semibold text-[#15344F] dark:text-emerald-200"
                >
                  {credential}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6 space-y-3.5 border-t border-[#E8EBE6] pt-5 dark:border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E6D7B] dark:text-slate-400">Professional Background & Expertise</h3>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-[0.9375rem]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[#E8EBE6] pt-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            {hasLink(teamLink) ? (
              <CmsLink
                link={teamLink}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#21649A] transition-colors hover:text-[#54B848] dark:text-sky-300"
              >
                <span>View all advisory team members</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </CmsLink>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-[#15344F] px-5 py-2 text-xs font-bold text-white transition-all hover:bg-[#21649A] dark:bg-white/10 dark:hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "white", spacing: "py-16 sm:py-20 lg:py-24" });
  const members = visibleItems(content.members);
  const [selected, setSelected] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [totalDots, setTotalDots] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef(null);
  const isMobile = useIsMobile();
  const headingId = `${id}-heading`;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < maxScroll - 8);

    const step = stepOf(el);
    if (step > 0 && maxScroll > 10) {
      const stops = Math.round(maxScroll / step) + 1;
      setTotalDots(stops > 1 ? stops : 0);
      const current = Math.round(el.scrollLeft / step);
      setActiveDot(Math.max(0, Math.min(stops - 1, current)));
    } else {
      setTotalDots(0);
      setActiveDot(0);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    const handleScroll = () => updateScrollState();
    const handleResize = () => updateScrollState();

    window.addEventListener("resize", handleResize);
    el.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState();
    const initTimer = setTimeout(updateScrollState, 200);

    let timer = 0;
    const start = () => {
      if (!content.autoScroll) return;
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 8;
        if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
        else el.scrollBy({ left: stepOf(el), behavior: "smooth" });
      }, 3500);
    };
    const pause = () => window.clearInterval(timer);

    start();
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", start);
    el.addEventListener("touchstart", pause, { passive: true });
    return () => {
      clearTimeout(initTimer);
      window.clearInterval(timer);
      window.removeEventListener("resize", handleResize);
      el.removeEventListener("scroll", handleScroll);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", start);
      el.removeEventListener("touchstart", pause);
    };
  }, [content.autoScroll, updateScrollState]);

  function scrollByStep(direction) {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: direction * stepOf(el), behavior: "smooth" });
  }

  function scrollToDot(index) {
    const el = scrollRef.current;
    if (!el) return;
    const step = stepOf(el);
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = Math.min(maxScroll, Math.max(0, index * step));
    el.scrollTo({ left: target, behavior: "smooth" });
  }

  return (
    <section {...root} aria-labelledby={content.title ? headingId : undefined} className={`${look.background} ${look.spacing}`} style={look.style}>
      <div className="site-frame px-4 sm:px-6">
        {content.showLeader ? <Leader content={content} /> : null}
        {content.showLeader && members.length ? <div className="my-14 border-t border-[#E8EBE6] dark:border-white/10 sm:my-16" /> : null}

        {members.length ? (
          <>
            <SectionHead
              eyebrow={content.eyebrow}
              id={headingId}
              title={content.title}
              light={look.light}
            />

            <div className="relative mt-10 sm:mt-12">
              <button
                type="button"
                onClick={() => scrollByStep(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous members"
                className={`top-[6.5rem] max-sm:hidden ${SIDE_ARROW}`}
                style={{ left: ARROW_OFFSET }}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div
                ref={scrollRef}
                className="flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto scroll-smooth pb-4 pt-2 [scrollbar-width:none] sm:snap-none [&::-webkit-scrollbar]:hidden"
                style={isMobile ? undefined : edgeMask(canScrollLeft, canScrollRight)}
              >
                {members.map((person) => (
                  <MemberCard key={person.id} person={person} onSelect={setSelected} />
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollByStep(1)}
                disabled={!canScrollRight}
                aria-label="Next members"
                className={`top-[6.5rem] max-sm:hidden ${SIDE_ARROW}`}
                style={{ right: ARROW_OFFSET }}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {totalDots > 1 ? (
              <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8">
                <button type="button" onClick={() => scrollByStep(-1)} disabled={!canScrollLeft} aria-label="Previous member" className={`sm:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCE4E8] bg-white text-[#21649A] shadow-sm transition-colors hover:border-[#21649A] hover:bg-[#21649A] hover:text-white disabled:opacity-30 dark:border-white/15 dark:bg-[#102A40] dark:text-white ${FOCUS}`}>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="flex flex-wrap items-center justify-center gap-2">
                {Array.from({ length: totalDots }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={idx === activeDot ? "true" : undefined}
                    onClick={() => scrollToDot(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeDot
                        ? "w-8 bg-[#54B848]"
                        : "w-2.5 bg-[#DCE4E8] hover:bg-[#21649A]/40 dark:bg-white/20 dark:hover:bg-white/40"
                    } ${FOCUS}`}
                  />
                ))}
                </div>
                <button type="button" onClick={() => scrollByStep(1)} disabled={!canScrollRight} aria-label="Next member" className={`sm:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCE4E8] bg-white text-[#21649A] shadow-sm transition-colors hover:border-[#21649A] hover:bg-[#21649A] hover:text-white disabled:opacity-30 dark:border-white/15 dark:bg-[#102A40] dark:text-white ${FOCUS}`}>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </>
        ) : null}

        {selected ? <MemberModal member={selected} teamLink={content.button} onClose={() => setSelected(null)} /> : null}
      </div>
    </section>
  );
}
