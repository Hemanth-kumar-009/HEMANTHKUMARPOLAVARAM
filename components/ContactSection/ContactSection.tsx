"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const EMAIL = "polavaramhemanthkumar@gmail.com";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(
          Array.from(children),
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 1.2, ease: "expo.out", stagger: 0.12,
            scrollTrigger: { trigger: contentRef.current, start: "top 78%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* fallback silent */ }
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      {/* Horizontal rule top */}
      <div className={styles.ruleLine} aria-hidden="true" />

      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <span className={styles.eyebrow}>Let's work together</span>

          <h2 className={styles.bigText}>
            Ready when
            <br />
            <em>you are.</em>
          </h2>

          <p className={styles.body}>
            Whether you have a data problem to solve or want to collaborate
            on an AI/ML project — I'd love to hear from you. I am currently
            open to Data Analyst roles, freelance projects, and exciting
            collaborations.
          </p>

          {/* Email row */}
          <div className={styles.emailRow}>
            <a href={`mailto:${EMAIL}`} className={styles.emailLink}>
              {EMAIL}
            </a>
            <button
              className={styles.copyBtn}
              onClick={copyEmail}
              aria-label="Copy email address"
              title="Copy"
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          {/* Social links */}
          <nav className={styles.socials} aria-label="Social links">
            {[
              { label: "GitHub", href: "https://github.com/Hemanth-kumar-009" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/polavaram-hemanth-kumar-0629b2264" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer strip */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerName}>Hemanth Polavaram</span>
          <span className={styles.footerCopy}>
            © {new Date().getFullYear()} — Built with obsession.
          </span>
        </div>
      </footer>
    </section>
  );
}
