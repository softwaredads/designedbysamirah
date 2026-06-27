"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  aboutSamirah,
  featuredSpaces,
  pressItems,
  serviceCategories,
  servicesHeroImage,
  studioHeroImage,
  type ServiceCategory,
} from "@/lib/content";
import {
  contactCta,
  contactHeadline,
  contactLine,
  contactResponse,
  MAILTO,
  serviceEnquireCta,
  serviceMailto,
  servicesHeadline,
  servicesHint,
  servicesNote,
  servicesScopeNote,
  swipeHint,
} from "@/lib/theatre";

import { createTheatreAudio, type TheatreAudio } from "@/lib/theatreAudio";

const TOTAL_SCENES = 1 + featuredSpaces.length + 2;
const SERVICES_SCENE = featuredSpaces.length + 1;
const CONTACT_SCENE = TOTAL_SCENES - 1;

const NAV_SECTIONS = [
  { key: "about", label: "About", scene: 0 },
  { key: "work", label: "Work", scene: 1 },
  { key: "services", label: "Services", scene: SERVICES_SCENE },
  { key: "enquire", label: "Enquire", scene: CONTACT_SCENE },
] as const;

function getActiveNav(sceneIndex: number) {
  if (sceneIndex === 0) return "about";
  if (sceneIndex <= featuredSpaces.length) return "work";
  if (sceneIndex === SERVICES_SCENE) return "services";
  return "enquire";
}

function getSceneLabel(sceneIndex: number) {
  if (sceneIndex === 0) return "About";
  if (sceneIndex <= featuredSpaces.length) {
    const space = featuredSpaces[sceneIndex - 1];
    return `Work · ${space.title.split(" ")[0]}`;
  }
  if (sceneIndex === SERVICES_SCENE) return "Services";
  return "Enquire";
}

function SoundIcon({ on }: { on: boolean }) {
  if (on) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M17.66 6.34a8.5 8.5 0 0 1 0 11.32" />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="m22 9-6 6" />
      <path d="m16 9 6 6" />
    </svg>
  );
}

export default function TheSetExperience() {
  const [phase, setPhase] = useState<"intro" | "playing">("intro");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [coverRevealed, setCoverRevealed] = useState(false);
  const [entering, setEntering] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [activeService, setActiveService] = useState<ServiceCategory | null>(
    null,
  );
  const touchRef = useRef({ x: 0, y: 0, scrollable: false });
  const audioRef = useRef<TheatreAudio | null>(null);

  useEffect(() => {
    audioRef.current = createTheatreAudio();
    return () => {
      audioRef.current?.dispose();
      audioRef.current = null;
    };
  }, []);

  const dismissSwipeHint = useCallback(() => {
    setShowSwipeHint(false);
  }, []);

  const goToScene = useCallback(
    (next: number) => {
      if (transitioning) return;
      const clamped = Math.max(0, Math.min(TOTAL_SCENES - 1, next));
      if (clamped === sceneIndex) return;

      dismissSwipeHint();
      audioRef.current?.playTransition(clamped);
      setTransitioning(true);
      setCoverRevealed(false);
      setTimeout(() => {
        setSceneIndex(clamped);
        setTimeout(() => setTransitioning(false), 80);
      }, 600);
    },
    [sceneIndex, transitioning, dismissSwipeHint],
  );

  const next = useCallback(() => {
    if (phase === "intro") return;
    goToScene(sceneIndex + 1);
  }, [phase, sceneIndex, goToScene]);

  const prev = useCallback(() => {
    if (phase === "intro") return;
    goToScene(sceneIndex - 1);
  }, [phase, sceneIndex, goToScene]);

  const enter = useCallback(() => {
    setEntering(true);

    const audio = audioRef.current;
    if (audio && soundOn) {
      audio.prime();
      audio.setEnabled(true);
      audio.playEnter();
    }

    window.setTimeout(() => {
      setPhase("playing");
      setShowSwipeHint(true);
    }, 180);
    window.setTimeout(() => {
      setEntering(false);
      setCoverRevealed(true);
      if (soundOn) audioRef.current?.playReveal();
    }, 420);
  }, [soundOn]);

  const toggleSound = useCallback(() => {
    setSoundOn((current) => {
      const next = !current;
      const audio = audioRef.current;
      if (audio) {
        if (next) audio.prime();
        audio.setEnabled(next);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (phase === "playing" && sceneIndex === 0 && !entering) {
      setCoverRevealed(true);
    }
    if (sceneIndex !== 0) {
      setCoverRevealed(false);
    }
  }, [phase, sceneIndex, entering]);

  useEffect(() => {
    if (sceneIndex !== SERVICES_SCENE) {
      setActiveService(null);
    }
  }, [sceneIndex]);

  useEffect(() => {
    if (!activeService) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveService(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeService]);

  useEffect(() => {
    if (!showSwipeHint) return;
    const timer = window.setTimeout(dismissSwipeHint, 5000);
    return () => window.clearTimeout(timer);
  }, [showSwipeHint, dismissSwipeHint]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase === "intro") {
        if (e.key === "Enter") enter();
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, enter, next, prev]);

  const onTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    touchRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      scrollable: Boolean(target.closest("[data-scrollable]")),
    };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (phase === "intro" || touchRef.current.scrollable || activeService) return;

    const diffX = touchRef.current.x - e.changedTouches[0].clientX;
    const diffY = touchRef.current.y - e.changedTouches[0].clientY;

    if (Math.abs(diffX) < 48 || Math.abs(diffX) < Math.abs(diffY)) return;
    if (diffX > 0) next();
    else prev();
  };

  const projectIndex = sceneIndex - 1;
  const isProject = sceneIndex >= 1 && sceneIndex <= featuredSpaces.length;
  const isServices = sceneIndex === SERVICES_SCENE;
  const isContact = sceneIndex === CONTACT_SCENE;
  const isAbout = sceneIndex === 0;
  const label = getSceneLabel(sceneIndex);
  const activeNav = getActiveNav(sceneIndex);

  return (
    <div
      className="the-set"
      lang="en"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={`the-set-curtain ${transitioning || entering ? "is-active" : ""} ${entering ? "is-enter" : ""}`}
        aria-hidden
      />

      <header className="the-set-header">
        <span className="the-set-brand">Designed by Samirah</span>
        <div className="the-set-header-actions">
          {phase === "playing" && (
            <>
              <a href={`mailto:${MAILTO}`} className="the-set-enquire-link">
                Enquire
              </a>
              <button
                type="button"
                onClick={toggleSound}
                className="the-set-sound-btn"
                aria-label={
                  soundOn ? "Turn sound off" : "Turn ambient sound on"
                }
                title={soundOn ? "Sound on" : "Sound off"}
              >
                <SoundIcon on={soundOn} />
              </button>
            </>
          )}
        </div>
      </header>

      {/* INTRO */}
      {phase === "intro" && (
        <div className="the-set-intro" onClick={enter} role="presentation">
          <div className="spotlight pointer-events-none absolute inset-0" />
          <div
            className="the-set-intro-inner"
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <p className="the-set-tagline font-serif font-light italic tracking-[0.03em] text-white/90">
              Every space tells a story.
            </p>
            <button
              type="button"
              onClick={enter}
              className="the-set-enter-btn"
            >
              Enter
            </button>
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/30">
              Bespoke interiors · Private commissions
            </p>
          </div>
        </div>
      )}

      {phase === "playing" && (
        <>
          {showSwipeHint && (
            <p className="the-set-swipe-hint" aria-live="polite">
              {swipeHint}
            </p>
          )}

          <div className="the-set-stage">
            <div className="curtain-left pointer-events-none" />
            <div className="curtain-right pointer-events-none" />
            <div className="stage-floor pointer-events-none" />

            {isAbout && (
              <div className="relative h-full w-full overflow-hidden">
                <div
                  className={`the-set-cover-media absolute inset-0 ${
                    coverRevealed ? "is-revealed" : ""
                  }`}
                >
                  <Image
                    src={studioHeroImage.src}
                    alt={studioHeroImage.alt}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
                <div
                  className={`the-set-cover-veil pointer-events-none absolute inset-0 ${
                    coverRevealed ? "is-revealed" : ""
                  }`}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="spotlight-soft pointer-events-none absolute inset-0" />
                <div
                  className={`the-set-about-panel scene-enter-content absolute inset-0 flex items-center justify-center px-5 sm:px-8 ${
                    coverRevealed ? "is-revealed" : ""
                  }`}
                >
                  <div className="the-set-about-inner text-center">
                    <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border border-white/20 sm:mb-6 sm:h-28 sm:w-28">
                      <Image
                        src={aboutSamirah.image}
                        alt={aboutSamirah.imageAlt}
                        fill
                        className="object-cover object-center"
                        sizes="112px"
                      />
                    </div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/50">
                      {aboutSamirah.role}
                    </p>
                    <h1 className="mt-2 font-serif text-3xl font-light tracking-[0.04em] text-white sm:text-4xl md:text-5xl">
                      {aboutSamirah.name}
                    </h1>
                    <p className="mx-auto mt-4 max-w-md font-serif text-base font-light leading-relaxed text-white/75 sm:mt-5 sm:text-lg">
                      {aboutSamirah.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isProject && (
              <div className="relative h-full w-full">
                <Image
                  key={featuredSpaces[projectIndex].id}
                  src={featuredSpaces[projectIndex].image}
                  alt={featuredSpaces[projectIndex].imageAlt}
                  fill
                  className="scene-enter object-cover object-center"
                  sizes="100vw"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/25 to-black/20" />
                <div className="spotlight-soft pointer-events-none absolute inset-0" />
                <div className="scene-enter-content the-set-project-copy">
                  <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/50">
                    {featuredSpaces[projectIndex].location} ·{" "}
                    {featuredSpaces[projectIndex].client}
                  </p>
                  <h2 className="mt-2 font-serif text-[1.75rem] font-light leading-tight tracking-[0.02em] text-white sm:mt-3 sm:text-4xl md:text-6xl">
                    {featuredSpaces[projectIndex].title}
                  </h2>
                  <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.28em] text-white/40">
                    {featuredSpaces[projectIndex].serviceType} ·{" "}
                    {featuredSpaces[projectIndex].year}
                  </p>
                  <p className="mt-1 font-sans text-[10px] tracking-[0.12em] text-white/35">
                    {featuredSpaces[projectIndex].scope}
                  </p>
                  <p className="mt-3 font-serif text-base font-light italic leading-relaxed text-white/80 sm:mt-4 sm:text-lg md:text-xl">
                    &ldquo;{featuredSpaces[projectIndex].caption}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {isServices && (
              <div className="the-set-services-scene relative h-full w-full">
                <Image
                  src={servicesHeroImage.src}
                  alt={servicesHeroImage.alt}
                  fill
                  className="scene-enter object-cover object-center"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/82" />
                <div
                  className="scene-enter-content the-set-services-panel"
                  data-scrollable
                >
                  <div className="the-set-services-inner">
                    <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/45">
                      Our services
                    </p>
                    <h2 className="mt-2 font-serif text-2xl font-light tracking-[0.03em] text-white/90 sm:text-3xl">
                      {servicesHeadline}
                    </h2>
                    <p className="mt-2 font-sans text-xs font-light leading-relaxed text-white/40">
                      {servicesHint}
                    </p>

                    <div className="the-set-service-grid mt-5 sm:mt-6">
                      {serviceCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setActiveService(category)}
                          className="the-set-service-tile"
                        >
                          <span className="the-set-service-tile-label">
                            {category.shortLabel}
                          </span>
                          <span className="the-set-service-tile-summary">
                            {category.summary}
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.24em] text-white/30 sm:mt-6">
                      {servicesScopeNote}
                    </p>
                    <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.28em] text-white/35">
                      {servicesNote}
                    </p>
                  </div>
                </div>

                {activeService && (
                  <div
                    className="the-set-service-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="service-overlay-title"
                    data-scrollable
                    onClick={() => setActiveService(null)}
                  >
                    <div
                      className="the-set-service-overlay-panel"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="the-set-service-overlay-close"
                        onClick={() => setActiveService(null)}
                        aria-label="Close"
                      >
                        ×
                      </button>
                      <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/45">
                        Service detail
                      </p>
                      <h3
                        id="service-overlay-title"
                        className="mt-2 font-serif text-xl font-light text-white/90 sm:text-2xl"
                      >
                        {activeService.title}
                      </h3>
                      <p className="mt-2 font-sans text-sm font-light text-white/50">
                        {activeService.summary}
                      </p>
                      <ul className="the-set-service-overlay-list mt-4">
                        {activeService.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <a
                        href={serviceMailto(activeService.title)}
                        className="the-set-enquire-btn mt-6 inline-block w-full text-center sm:mt-8"
                      >
                        {serviceEnquireCta}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isContact && (
              <div className="relative flex h-full items-center justify-center px-5 sm:px-8">
                <div className="spotlight pointer-events-none absolute inset-0 opacity-30" />
                <div
                  className="scene-enter-content relative z-10 max-w-lg text-center"
                  data-scrollable
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/45">
                    Get in touch
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-light tracking-[0.05em] text-white/90 sm:text-4xl md:text-5xl">
                    {contactHeadline}
                  </h2>
                  <p className="mt-4 font-sans text-sm font-light leading-relaxed text-white/45 sm:mt-6">
                    {contactLine}
                  </p>
                  <p className="mt-3 font-sans text-xs font-light text-white/35">
                    {contactResponse}
                  </p>
                  <a
                    href={`mailto:${MAILTO}`}
                    className="the-set-enquire-btn mt-8 inline-block sm:mt-10"
                  >
                    {contactCta}
                  </a>
                  <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.24em] text-white/30">
                    {MAILTO}
                  </p>

                  <div className="the-set-press-strip mt-10 sm:mt-12">
                    <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-white/30">
                      As featured in
                    </p>
                    <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2">
                      {pressItems.map((item) => (
                        <li
                          key={item.id}
                          className="font-sans text-[10px] tracking-[0.14em] text-white/40"
                        >
                          {item.publication}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <footer className="the-set-controls">
            <button
              type="button"
              onClick={prev}
              disabled={sceneIndex === 0 || transitioning || entering}
              className="the-set-nav-btn"
              aria-label="Previous scene"
            >
              ←
            </button>
            <div className="the-set-progress">
              <nav
                className="the-set-nav-jumps"
                aria-label="Jump to section"
              >
                {NAV_SECTIONS.map((section) => (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => goToScene(section.scene)}
                    disabled={transitioning || entering}
                    className={`the-set-nav-jump ${
                      section.key === "enquire" ? "is-enquire" : ""
                    } ${activeNav === section.key ? "is-active" : ""}`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
              <span className="the-set-scene-label mt-1.5 block max-w-[10rem] truncate sm:max-w-none">
                {label}
              </span>
              <span className="mt-0.5 font-sans text-[10px] tracking-[0.15em] text-white/50">
                {sceneIndex + 1} / {TOTAL_SCENES}
              </span>
            </div>
            <button
              type="button"
              onClick={next}
              disabled={
                sceneIndex === TOTAL_SCENES - 1 || transitioning || entering
              }
              className="the-set-nav-btn"
              aria-label="Next scene"
            >
              →
            </button>
          </footer>
        </>
      )}
    </div>
  );
}
