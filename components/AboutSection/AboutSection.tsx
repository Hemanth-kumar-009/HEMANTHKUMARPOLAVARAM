"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "Wipro", label: "Data Science — TalentNext Program" },
  { value: "Infosys Springboard", label: "AI  Intern" },
  { value: "IETE", label: "Secretary — Student Forum 2024–25" },
  { value: "Open", label: "Available for Opportunities" },
];
const SKILLS = [
  "Python", "SQL", "Power BI",
  "Machine Learning", "Data Visualization", "Pandas / NumPy/Matplotlib/Seaborn",
  "AI/ML Models", "Statistical Analysis",];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1.3, ease: "expo.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1.3, ease: "expo.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 78%" },
        }
      );

      /* Stat counter animation */
      const statItems = statsRef.current?.querySelectorAll("[data-stat]");
      if (statItems) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.9, ease: "expo.out", stagger: 0.1,
            scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <div className={styles.ambientLeft} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── Two-column split ── */}
        <div className={styles.split}>
          {/* Left — text */}
          <div ref={leftRef} className={styles.left} style={{ opacity: 0 }}>
            <span className={styles.eyebrow}>About</span>
            <h2 className={styles.title}>
              I build things
              <br />
              <em>that move people.</em>
            </h2>
            <p className={styles.body}>
              I'm a Data Analyst passionate about transforming raw data into 
              meaningful insights. My work lives at the intersection of 
              data analytics, visualization, and AI/ML — where every 
              dashboard, every model, every insight is carefully considered.
            </p>
            <p className={styles.body}>
              Currently building expertise in AI and Machine Learning, while 
              working with tools like Power BI, Python, and SQL to solve 
              real-world data problems and create intelligent solutions.
            </p>
            <p className={styles.body}>
              Currently open to select projects, creative collaborations, and
              conversations about the future of the web.
            </p>

            <a href="https://wa.me/918179204316" target="_blank" rel="noopener noreferrer" className={styles.cta}>
              Start a conversation
              <span aria-hidden="true"> →</span>
            </a>
	    <a href="/resume.pdf" download="Hemanth_Polavaram_Resume.pdf" className={styles.resumeBtn}>
              Download Resume
              <span aria-hidden="true"> ↓</span>
            </a>
          </div>

          {/* Right — skills + stats */}
          <div ref={rightRef} className={styles.right} style={{ opacity: 0 }}>
            {/* Skills */}
            <div className={styles.skillsBlock}>
              <span className={styles.blockLabel}>Capabilities</span>
              <ul className={styles.skillList} role="list">
                {SKILLS.map((skill) => (
                  <li key={skill} className={styles.skillItem}>
                    <span className={styles.skillDot} aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div ref={statsRef} className={styles.statsStrip}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statItem} data-stat>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
