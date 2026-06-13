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
        <h1 className={styles.name}>Hemanth<br />Polavaram</h1>
        <p className={styles.hint}>Best experienced with sound</p>
        <button className={styles.enterBtn} onClick={handleEnter}>
          <span>Enter Portfolio</span>
          <span className={styles.icon}>🔊</span>
        </button>
      </div>
    </div>
  );
}