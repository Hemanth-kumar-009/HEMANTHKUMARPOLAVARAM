"use client";

import { useEffect, useRef } from "react";
import styles from "./CinematicLayer.module.css";

/* ═══════════════════════════════════════════════════
   CinematicLayer — Three.js bokeh/particle system
   Warm amber + cool ice particles, sine-wave drift,
   mouse parallax, additive blending.
   ═══════════════════════════════════════════════════ */

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationId: number;
    let renderer: import("three").WebGLRenderer;
    let scene: import("three").Scene;
    let camera: import("three").PerspectiveCamera;
    let particleSystem: import("three").Points;
    let bokehSystem: import("three").Points;

    const mouse = { x: 0, y: 0 };
    const targetCam = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const init = async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      /* ── Renderer ── */
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      /* ── Scene ── */
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        200
      );
      camera.position.z = 30;

      /* ── Helper: circular disc texture ── */
      const makeCircleTexture = (size: number, color: string, blur: number) => {
        const c = document.createElement("canvas");
        c.width = size;
        c.height = size;
        const ctx = c.getContext("2d")!;
        const r = size / 2;
        const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
        grad.addColorStop(0, color);
        grad.addColorStop(blur, color.replace(/[\d.]+\)$/, "0.3)"));
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
        return new THREE.CanvasTexture(c);
      };

      /* ── Fine particles (main layer) ── */
      const PARTICLE_COUNT = 380;
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const phases = new Float32Array(PARTICLE_COUNT);
      const speeds = new Float32Array(PARTICLE_COUNT);
      const amplitudes = new Float32Array(PARTICLE_COUNT);
      const colorData = new Float32Array(PARTICLE_COUNT * 3);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
        phases[i] = Math.random() * Math.PI * 2;
        speeds[i] = 0.003 + Math.random() * 0.007;
        amplitudes[i] = 0.3 + Math.random() * 1.2;

        // Mix warm amber and cool ice
        if (Math.random() > 0.38) {
          // Amber
          colorData[i * 3 + 0] = 0.9 + Math.random() * 0.1;
          colorData[i * 3 + 1] = 0.55 + Math.random() * 0.25;
          colorData[i * 3 + 2] = 0.12 + Math.random() * 0.18;
        } else {
          // Ice blue
          colorData[i * 3 + 0] = 0.5 + Math.random() * 0.25;
          colorData[i * 3 + 1] = 0.7 + Math.random() * 0.2;
          colorData[i * 3 + 2] = 0.9 + Math.random() * 0.1;
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colorData, 3));

      const particleTex = makeCircleTexture(64, "rgba(255,200,120,1)", 0.35);
      const mat = new THREE.PointsMaterial({
        size: 0.28,
        sizeAttenuation: true,
        vertexColors: true,
        map: particleTex,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      particleSystem = new THREE.Points(geo, mat);
      scene.add(particleSystem);

      /* ── Bokeh layer (large soft discs) ── */
      const BOKEH_COUNT = 55;
      const bokehPos = new Float32Array(BOKEH_COUNT * 3);
      const bokehPhases = new Float32Array(BOKEH_COUNT);
      const bokehSpeeds = new Float32Array(BOKEH_COUNT);
      const bokehColors = new Float32Array(BOKEH_COUNT * 3);

      for (let i = 0; i < BOKEH_COUNT; i++) {
        bokehPos[i * 3 + 0] = (Math.random() - 0.5) * 90;
        bokehPos[i * 3 + 1] = (Math.random() - 0.5) * 55;
        bokehPos[i * 3 + 2] = -10 + (Math.random() - 0.5) * 18;
        bokehPhases[i] = Math.random() * Math.PI * 2;
        bokehSpeeds[i] = 0.001 + Math.random() * 0.003;

        if (Math.random() > 0.4) {
          bokehColors[i * 3 + 0] = 0.85 + Math.random() * 0.1;
          bokehColors[i * 3 + 1] = 0.45 + Math.random() * 0.2;
          bokehColors[i * 3 + 2] = 0.05 + Math.random() * 0.1;
        } else {
          bokehColors[i * 3 + 0] = 0.3 + Math.random() * 0.2;
          bokehColors[i * 3 + 1] = 0.55 + Math.random() * 0.2;
          bokehColors[i * 3 + 2] = 0.85 + Math.random() * 0.15;
        }
      }

      const bokehGeo = new THREE.BufferGeometry();
      bokehGeo.setAttribute("position", new THREE.BufferAttribute(bokehPos, 3));
      bokehGeo.setAttribute("color", new THREE.BufferAttribute(bokehColors, 3));

      const bokehTex = makeCircleTexture(128, "rgba(255,180,80,1)", 0.18);
      const bokehMat = new THREE.PointsMaterial({
        size: 2.8,
        sizeAttenuation: true,
        vertexColors: true,
        map: bokehTex,
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      bokehSystem = new THREE.Points(bokehGeo, bokehMat);
      scene.add(bokehSystem);

      /* ── Resize handler ── */
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      /* ── Render loop ── */
      let clock = 0;
      const posArr = geo.attributes.position.array as Float32Array;
      const bokehArr = bokehGeo.attributes.position.array as Float32Array;

      // Store original Y for sine drift
      const origY = new Float32Array(PARTICLE_COUNT);
      const origX = new Float32Array(PARTICLE_COUNT);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        origY[i] = posArr[i * 3 + 1];
        origX[i] = posArr[i * 3 + 0];
      }
      const bokehOrigY = new Float32Array(BOKEH_COUNT);
      for (let i = 0; i < BOKEH_COUNT; i++) {
        bokehOrigY[i] = bokehArr[i * 3 + 1];
      }

      const tick = () => {
        clock += 0.016;

        // Animate fine particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const phase = phases[i];
          const spd = speeds[i];
          const amp = amplitudes[i];
          posArr[i * 3 + 1] = origY[i] + Math.sin(clock * spd * 60 + phase) * amp;
          posArr[i * 3 + 0] = origX[i] + Math.cos(clock * spd * 40 + phase * 1.3) * (amp * 0.5);
        }
        geo.attributes.position.needsUpdate = true;

        // Animate bokeh (slower drift)
        for (let i = 0; i < BOKEH_COUNT; i++) {
          const phase = bokehPhases[i];
          const spd = bokehSpeeds[i];
          bokehArr[i * 3 + 1] = bokehOrigY[i] + Math.sin(clock * spd * 60 + phase) * 1.8;
        }
        bokehGeo.attributes.position.needsUpdate = true;

        // Mouse parallax on camera
        targetCam.x += (mouse.x * 1.4 - targetCam.x) * 0.028;
        targetCam.y += (mouse.y * 0.8 - targetCam.y) * 0.028;
        camera.position.x = targetCam.x;
        camera.position.y = targetCam.y;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(tick);
      };

      tick();

      /* ── Cleanup closure ── */
      (window as any).__cinematicCleanup = () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", handleMouseMove);
        geo.dispose();
        bokehGeo.dispose();
        mat.dispose();
        bokehMat.dispose();
        particleTex.dispose();
        bokehTex.dispose();
        renderer.dispose();
      };
    };

    init();

    return () => {
      if ((window as any).__cinematicCleanup) {
        (window as any).__cinematicCleanup();
        delete (window as any).__cinematicCleanup;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
