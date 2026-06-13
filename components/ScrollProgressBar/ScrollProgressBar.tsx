"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import styles from "./ScrollProgressBar.module.css";

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className={styles.track} aria-hidden="true">
      <div
        className={styles.bar}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
