"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import styles from "./VideoIntro.module.css";
import CinematicLayer from "../CinematicLayer/CinematicLayer";

const VIDEO_SRC = "/hero.mp4";

export default function VideoIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const soundBadgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const soundHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* ── Stop video on scroll away ── */
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      if (scrollY > heroHeight * 0.6) {
        bgVideoRef.current?.pause();
        fgVideoRef.current?.pause();
        setPlaying(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Hero fade in
      tl.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: "power2.inOut" }
      );

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 14, letterSpacing: "0.5em" },
        { opacity: 1, y: 0, letterSpacing: "0.25em", duration: 1.2, ease: "power3.out" },
        "-=0.9"
      );

      // First name slides in from left
      tl.fromTo(
        firstNameRef.current,
        { opacity: 0, x: -60, skewX: -4 },
        { opacity: 1, x: 0, skewX: 0, duration: 1.4, ease: "expo.out" },
        "-=0.7"
      );

      // Last name slides in from right
      tl.fromTo(
        lastNameRef.current,
        { opacity: 0, x: 60, skewX: 4 },
        { opacity: 1, x: 0, skewX: 0, duration: 1.4, ease: "expo.out" },
        "-=1.2"
      );

      // Role subtitle
      tl.fromTo(
        roleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      // Controls
      tl.fromTo(
        controlsRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Auto-hide sound badge ── */
  useEffect(() => {
    soundHideTimer.current = setTimeout(() => {
      if (soundBadgeRef.current) {
        gsap.to(soundBadgeRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.6,
          ease: "power2.in",
          onComplete: () => setShowSoundHint(false),
        });
      }
    }, 4500);

    return () => {
      if (soundHideTimer.current) clearTimeout(soundHideTimer.current);
    };
  }, []);

  /* ── Mute/unmute ── */
const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (bgVideoRef.current) bgVideoRef.current.muted = next;
      if (fgVideoRef.current) {
        fgVideoRef.current.muted = next;
        if (!next) {
          fgVideoRef.current.volume = 1;
          fgVideoRef.current.play();
        }
      }
      return next;
    });
    // Hide the sound hint immediately on first interaction
    if (showSoundHint && soundBadgeRef.current) {
      if (soundHideTimer.current) clearTimeout(soundHideTimer.current);
      gsap.to(soundBadgeRef.current, {
        opacity: 0, y: -8, duration: 0.4, ease: "power2.in",
        onComplete: () => setShowSoundHint(false),
      });
    }
  }, [showSoundHint]);

  /* ── Play/pause ── */
  const togglePlay = useCallback(() => {
    setPlaying((prev) => {
      const next = !prev;
      if (next) {
        bgVideoRef.current?.play();
        fgVideoRef.current?.play();
      } else {
        bgVideoRef.current?.pause();
        fgVideoRef.current?.pause();
      }
      return next;
    });
  }, []);

  /* ── Scroll to next section ── */
  const scrollDown = useCallback(() => {
    const next = document.getElementById("work");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Portfolio hero">

      {/* ── Ambient blurred background video ── */}
      <div className={styles.bgVideoWrap} aria-hidden="true">
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div className={styles.bgVideoScrim} />
      </div>

      {/* ── Three.js cinematic particle layer ── */}
      <CinematicLayer />

      {/* ── Cinematic gradient overlays ── */}
      <div className={styles.gradientLeft} aria-hidden="true" />
      <div className={styles.gradientRight} aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />
      <div className={styles.gradientTop} aria-hidden="true" />
      <div className={styles.vignetteRing} aria-hidden="true" />

      {/* ── Foreground video (subject) ── */}
      <div className={styles.fgVideoWrap}>
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        {/* Subtle mask blend on edges */}
        <div className={styles.fgVideoMask} aria-hidden="true" />
      </div>

      {/* ── Overlay content ── */}
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />

      <div ref={contentRef} className={styles.content}>
        <span ref={taglineRef} className={styles.tagline}>
          Data Analyst &amp; AI/ML Enthusiast
        </span>

        <h1 className={styles.name} aria-label="Alex Mercer">
          <div ref={firstNameRef} className={styles.firstName}>Hemanth Kumar</div>
          <div ref={lastNameRef} className={styles.lastName}>Polavaram</div>
        </h1>

        <p ref={roleRef} className={styles.role}>
          Data Analyst passionate about transforming data
          <br />
          <em>into intelligent, AI-driven solutions.</em>
        </p>
      </div>

      {/* ── Controls ── */}
	<div ref={controlsRef} className={styles.controls} role="group" aria-label="Video controls" style={{position:'fixed', bottom:'2rem', right:'2rem', zIndex:9999}}>
        <button
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          title={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
              <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
            </svg>
          )}
        </button>

        <button
          className={styles.controlBtn}
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11 5L6 9H2v6h4l5 4V5zM17.07 7.07a10 10 0 0 1 0 9.86M14.54 9.54a6 6 0 0 1 0 4.92" stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinecap="round"/>
              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Sound hint badge ── */}
      {showSoundHint && (
        <div ref={soundBadgeRef} className={styles.soundBadge} onClick={toggleMute} role="button" tabIndex={0} aria-label="Tap to toggle sound">
          <span className={styles.soundDot} aria-hidden="true" />
          <span>Tap for sound</span>
        </div>
      )}

      {/* ── Scroll indicator ── */}
      <button
        ref={scrollIndicatorRef as React.RefObject<HTMLButtonElement>}
        className={styles.scrollIndicator}
        onClick={scrollDown}
        aria-label="Scroll to work section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} aria-hidden="true">
          <span className={styles.scrollPulse} />
        </span>
      </button>

    </section>
  );
}
