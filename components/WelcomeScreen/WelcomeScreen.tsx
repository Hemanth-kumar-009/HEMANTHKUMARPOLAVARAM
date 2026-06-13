"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import styles from "./WelcomeScreen.module.css";

export default function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [leaving, setLeaving] = useState(false);

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);

    // Unmute and play videos immediately on click
    const videos = document.querySelectorAll("video");
    videos.forEach((v) => {
      v.muted = false;
      v.volume = 1;
      v.play().catch(() => {
        v.muted = true;
        v.play();
      });
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: onEnter,
    });
  };

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.content}>
        <span className={styles.tagline}>Data Analyst · AI/ML Enthusiast</span>
        <h1 className={styles.name}>Hemanth Kumar<br />Polavaram</h1>
        <p className={styles.hint}>Best experienced with sound</p>
        <button className={styles.enterBtn} onClick={handleEnter}>
          <span>Enter Portfolio</span>
        </button>
      </div>
    </div>
  );
}