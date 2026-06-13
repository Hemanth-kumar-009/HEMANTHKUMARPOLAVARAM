"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WorkSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    title: "AI Research Paper Summarizer",
    category: "AI",
    description:
      "Developed an AI-powered application that analyzes research papers and generates concise summaries using the Gemini AI API. Implemented text preprocessing, automated content extraction, and intelligent summarization to improve research efficiency.",
    year: "2026",
    tags: ["Python", "Gemini API", "AI"],
    accent: "amber",
    link: "https://github.com/Hemanth-kumar-009/AiResearchAgent",
  },
  {
    id: "02",
    title: "HR Analytics Dashboard",
    category: "Data Analytics · Business Intelligence",
    description:
      "Built an interactive Power BI dashboard to analyze employee attrition, workforce demographics, job satisfaction, and performance metrics. Enabled data-driven decision-making through insightful visualizations and KPI tracking.",
    year: "2025",
    tags: ["Power BI", "Visualization", "Data Analytics"],
    accent: "ice",
  },
  {
    id: "03",
    title: "Water Tank Alarm System",
    category: "Embedded Systems · IoT",
    description:
      "Designed an automated water level monitoring system that detects tank levels and triggers alerts to prevent overflow and water wastage. Focused on efficient resource management through sensor-based monitoring.",
    year: "2025",
    tags: ["Arduino", "Sensors", "Embedded Systems"],
    accent: "amber",
  },
  {
    id: "04",
    title: "Agriculture Monitoring System",
    category: "IoT · Smart Agriculture",
    description:
      "Developed a smart agriculture monitoring solution for tracking environmental parameters such as soil moisture, temperature, and humidity. The system supports data-driven farming practices and resource optimization.",
    year: "2025",
    tags: ["IoT", "ESP-32", "Sensors"],
    accent: "ice",
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading reveal */
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      /* Each card staggers in */
      const cards = gridRef.current?.querySelectorAll("[data-card]");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.14,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className={styles.section}>
      {/* Ambient glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Heading */}
        <div ref={headingRef} className={styles.heading}>
          <span className={styles.eyebrow}>Selected Work</span>
          <h2 className={styles.title}>
            Crafted with
            <br />
            <em>intention.</em>
          </h2>
          <p className={styles.subtitle}>
            A curated set of projects where design, engineering,
            and motion converge into something worth feeling.
          </p>
        </div>

        {/* Project grid */}
        <div ref={gridRef} className={styles.grid}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Individual project card ── */
function ProjectCard({ project }: { project: typeof PROJECTS[number] & { link?: string } })     {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    gsap.to(card, {
      rotateX: -y * 4,
      rotateY: x * 4,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "expo.out",
    });
  };

return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles[`card--${project.accent}`]}`}
      data-card
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => project.link && window.open(project.link, '_blank')}
      style={{ cursor: 'pointer' }}
    >
      {/* Card inner layout */}
      <div className={styles.cardTop}>
        <span className={styles.cardId}>{project.id}</span>
        <span className={styles.cardYear}>{project.year}</span>
      </div>

      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{project.category}</span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.cardTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <span className={styles.cardArrow} aria-hidden="true">↗</span>
      </div>

      {/* Shimmer overlay */}
      <div className={styles.cardShimmer} aria-hidden="true" />
    </div>
  );
}
