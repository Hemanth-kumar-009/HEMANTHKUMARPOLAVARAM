"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Entrance animation */
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 1.6 }
    );
  }, []);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const smoothScroll = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}
      role="navigation"
      aria-label="Main navigation"
      style={{ opacity: 0 }} /* GSAP handles */
    >
      <div className={styles.inner}>
        {/* Logo / wordmark */}
        <a
          href="#"
          className={styles.logo}
          aria-label="Hemanth Kumar — home"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <span className={styles.logoMark}>PH</span>
          <span className={styles.logoDivider} aria-hidden="true" />
          <span className={styles.logoFull}>Hemanth Kumar Polavaram</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <button
                className={styles.navLink}
                onClick={() => smoothScroll(href)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
       <a href="https://mail.google.com/mail/?view=cm&to=polavaramhemanthkumar@gmail.com&su=Hiring%20Inquiry%20-%20Hemanth%20Polavaram&body=Hi%20Hemanth%2C%20I%20would%20like%20to%20discuss%20an%20opportunity%20with%20you." target="_blank" rel="noopener noreferrer" className={styles.cta}>
          Hire me
        </a>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`} aria-hidden={!menuOpen}>
        <ul role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <button className={styles.drawerLink} onClick={() => smoothScroll(href)}>
                {label}
              </button>
            </li>
          ))}
          <li>
            <a href="https://mail.google.com/mail/?view=cm&to=polavaramhemanthkumar@gmail.com&su=Hiring%20Inquiry%20-%20Hemanth%20Polavaram&body=Hi%20Hemanth%2C%20I%20would%20like%20to%20discuss%20an%20opportunity%20with%20you." target="_blank" rel="noopener noreferrer" className={styles.cta}>
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
