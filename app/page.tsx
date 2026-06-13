"use client";

import { useState } from "react";
import VideoIntro from "@/components/VideoIntro/VideoIntro";
import WorkSection from "@/components/WorkSection/WorkSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import WelcomeScreen from "@/components/WelcomeScreen/WelcomeScreen";

export default function Home() {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
    // Unmute videos after user interaction
    const videos = document.querySelectorAll("video");
    videos.forEach((v) => {
      v.muted = false;
      v.volume = 1;
      v.play();
    });
  };

  return (
    <main>
      {!entered && <WelcomeScreen onEnter={handleEnter} />}
      <VideoIntro />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}