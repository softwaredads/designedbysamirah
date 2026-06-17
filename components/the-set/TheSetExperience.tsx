"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { featuredSpaces } from "@/lib/content";
import { contactLine, oscarMonologue } from "@/lib/theatre";

import { createTheatreAudio, type TheatreAudio } from "@/lib/theatreAudio";

const TOTAL_SCENES = 1 + featuredSpaces.length + 2;
const roman = ["I", "II", "III", "IV", "V", "VI", "VII"];

function getSceneLabel(sceneIndex: number) {
  if (sceneIndex === 0) return "Scene I — Cover";
  if (sceneIndex <= featuredSpaces.length) {
    const space = featuredSpaces[sceneIndex - 1];
    return `Scene ${roman[sceneIndex]} — ${space.title.split(" ")[0]}`;
  }
  if (sceneIndex === featuredSpaces.length + 1) return "Scene VI — Oscar";
  return "Scene VII — Contact";
}

export default function TheSetExperience() {
  const [phase, setPhase] = useState<"intro" | "playing">("intro");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [coverRevealed, setCoverRevealed] = useState(false);
  const [entering, setEntering] = useState(false);
  const touchRef = useRef({ x: 0, y: 0, scrollable: false });
  const audioRef = useRef<TheatreAudio | null>(null);

  useEffect(() => {
    audioRef.current = createTheatreAudio();
    return () => {
      audioRef.current?.dispose();
      audioRef.current = null;
    };
  }, []);

  const goToScene = useCallback(
    (next: number) => {
      if (transitioning) return;
      const clamped = Math.max(0, Math.min(TOTAL_SCENES - 1, next));
      if (clamped === sceneIndex) return;

      audioRef.current?.playTransition(clamped);
      setTransitioning(true);
      setCoverRevealed(false);
      setTimeout(() => {
        setSceneIndex(clamped);
        setTimeout(() => setTransitioning(false), 80);
      }, 600);
    },
    [sceneIndex, transitioning],
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
    setSoundOn(true);

    const audio = audioRef.current;
    if (audio) {
      audio.prime();
      audio.setEnabled(true);
      audio.playEnter();
    }

    window.setTimeout(() => setPhase("playing"), 180);
    window.setTimeout(() => {
      setEntering(false);
      setCoverRevealed(true);
      audioRef.current?.playReveal();
    }, 420);
  }, []);

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
    if (phase === "intro" || touchRef.current.scrollable) return;

    const diffX = touchRef.current.x - e.changedTouches[0].clientX;
    const diffY = touchRef.current.y - e.changedTouches[0].clientY;

    if (Math.abs(diffX) < 48 || Math.abs(diffX) < Math.abs(diffY)) return;
    if (diffX > 0) next();
    else prev();
  };

  const projectIndex = sceneIndex - 1;
  const isProject = sceneIndex >= 1 && sceneIndex <= featuredSpaces.length;
  const isOscar = sceneIndex === featuredSpaces.length + 1;
  const isContact = sceneIndex === TOTAL_SCENES - 1;
  const isCover = sceneIndex === 0;
  const label = getSceneLabel(sceneIndex);

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
        {phase === "playing" && (
          <button
            type="button"
            onClick={toggleSound}
            className="the-set-sound-btn"
            aria-label={soundOn ? "Turn sound off" : "Turn ambient sound on"}
          >
            Sound {soundOn ? "On" : "Off"}
          </button>
        )}
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
              Tap anywhere to begin · With sound
            </p>
          </div>
        </div>
      )}

      {phase === "playing" && (
        <>
          {/* Stage */}
          <div className="the-set-stage">
            <div className="curtain-left pointer-events-none" />
            <div className="curtain-right pointer-events-none" />
            <div className="stage-floor pointer-events-none" />

            {isCover && (
              <div className="relative h-full w-full overflow-hidden">
                <div
                  className={`the-set-cover-media absolute inset-0 ${
                    coverRevealed ? "is-revealed" : ""
                  }`}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&q=85"
                    alt="Luxury interior stage set"
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
                <div className="spotlight-soft pointer-events-none absolute inset-0" />
                <div
                  className={`the-set-cover-title absolute inset-0 flex items-center justify-center px-5 sm:px-8 ${
                    coverRevealed ? "is-revealed" : ""
                  }`}
                >
                  <div className="text-center">
                    <h1 className="font-serif text-[2rem] font-light leading-tight tracking-[0.06em] text-white sm:text-5xl md:text-7xl lg:text-8xl">
                      Designed by Samirah
                    </h1>
                    <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.32em] text-white/50 sm:mt-6 sm:text-[11px]">
                      Interior Design Studio
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
                    {featuredSpaces[projectIndex].location}
                  </p>
                  <h2 className="mt-2 font-serif text-[1.75rem] font-light leading-tight tracking-[0.02em] text-white sm:mt-3 sm:text-4xl md:text-6xl">
                    {featuredSpaces[projectIndex].title}
                  </h2>
                  <p className="mt-3 font-serif text-base font-light italic leading-relaxed text-white/80 sm:mt-5 sm:text-lg md:text-xl">
                    &ldquo;{featuredSpaces[projectIndex].caption}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {isOscar && (
              <div className="oscar-scene relative flex h-full items-center justify-center">
                <div className="oscar-glow pointer-events-none absolute inset-0" />
                <div className="scene-enter-content the-set-oscar-panel">
                  <div className="the-set-oscar-inner">
                    <div className="relative mb-5 h-28 w-20 shrink-0 sm:mb-8 sm:h-40 sm:w-28 md:h-48 md:w-36">
                      <Image
                        src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80"
                        alt="Single chair in golden light"
                        fill
                        className="object-contain opacity-90"
                        sizes="(max-width: 640px) 120px, 200px"
                      />
                    </div>
                    <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-amber-200/50 sm:text-[10px]">
                      Academy of Motion Picture Arts and Sciences — 2024
                    </p>
                    <h2 className="mt-4 font-serif text-xl font-light tracking-[0.03em] text-white/90 sm:text-2xl md:text-3xl">
                      Oscar for Production Design
                    </h2>
                    <div className="mt-5 space-y-4 sm:mt-6">
                      {oscarMonologue.split("\n\n").map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 24)}
                          className="font-serif text-sm font-light leading-relaxed text-white/75 sm:text-base md:text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isContact && (
              <div className="relative flex h-full items-center justify-center px-5 sm:px-8">
                <div className="spotlight pointer-events-none absolute inset-0 opacity-30" />
                <div className="scene-enter-content relative z-10 max-w-lg text-center">
                  <h2 className="font-serif text-3xl font-light tracking-[0.05em] text-white/90 sm:text-4xl md:text-5xl">
                    Begin a conversation
                  </h2>
                  <p className="mt-4 font-sans text-sm font-light leading-relaxed text-white/40 sm:mt-6">
                    {contactLine}
                  </p>
                  <a
                    href="mailto:studio@designedbysamirah.com"
                    className="mt-8 inline-block break-all font-sans text-[10px] uppercase tracking-[0.22em] text-white/60 active:text-white sm:mt-10 sm:text-[11px] sm:tracking-[0.3em]"
                  >
                    studio@designedbysamirah.com
                  </a>
                  <p className="mt-10 font-serif text-xs font-light tracking-[0.12em] text-white/25 sm:mt-16 sm:text-sm">
                    Designed by Samirah
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom controls — mobile-first */}
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
              <span className="the-set-scene-label block max-w-[10rem] truncate sm:max-w-none">
                {label}
              </span>
              <span className="mt-1 font-sans text-[10px] tracking-[0.15em] text-white/50">
                {sceneIndex + 1} / {TOTAL_SCENES}
              </span>
            </div>
            <button
              type="button"
              onClick={next}
              disabled={sceneIndex === TOTAL_SCENES - 1 || transitioning || entering}
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
