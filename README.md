# Cinematic Portfolio — Alex Mercer

A premium, immersive portfolio hero built with **Next.js 14 App Router**, **Three.js**, **GSAP**, and **CSS Modules**. Dark cinematic aesthetic, warm amber practical lighting, mouse-parallax particle layer, and silky GSAP entrance animations.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Place your video
#    Copy your talking-head video to:
cp your-video.mp4 public/hero.mp4

# 3. Run development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

---

## Project Structure

```
cinematic-portfolio/
├── app/
│   ├── layout.tsx          # Root layout — Navbar, Cursor, ProgressBar
│   ├── page.tsx            # Page — assembles all sections
│   └── globals.css         # CSS variables, resets, Google Fonts
│
├── components/
│   ├── VideoIntro/         # ★ Hero section (video + content + controls)
│   │   ├── VideoIntro.tsx
│   │   └── VideoIntro.module.css
│   │
│   ├── CinematicLayer/     # Three.js bokeh/particle overlay
│   │   ├── CinematicLayer.tsx
│   │   └── CinematicLayer.module.css
│   │
│   ├── Navbar/             # Fixed nav with glass blur on scroll
│   │   ├── Navbar.tsx
│   │   └── Navbar.module.css
│   │
│   ├── WorkSection/        # Project grid with 3D tilt cards
│   │   ├── WorkSection.tsx
│   │   └── WorkSection.module.css
│   │
│   ├── AboutSection/       # Split layout + stats strip
│   │   ├── AboutSection.tsx
│   │   └── AboutSection.module.css
│   │
│   ├── ContactSection/     # CTA + email copy + socials + footer
│   │   ├── ContactSection.tsx
│   │   └── ContactSection.module.css
│   │
│   ├── CustomCursor/       # Amber dot + lagging ring cursor
│   │   ├── CustomCursor.tsx
│   │   └── CustomCursor.module.css
│   │
│   └── ScrollProgressBar/  # Thin amber progress line at top
│       ├── ScrollProgressBar.tsx
│       └── ScrollProgressBar.module.css
│
├── hooks/
│   └── useScrollProgress.ts  # 0–1 scroll depth hook
│
└── public/
    └── hero.mp4              # ← Your talking-head video goes here
```

---

## Customisation

### Change the name & copy
Edit `components/VideoIntro/VideoIntro.tsx`:
```tsx
<div ref={firstNameRef} className={styles.firstName}>Alex</div>
<div ref={lastNameRef}  className={styles.lastName}>Mercer</div>
<p ref={roleRef} className={styles.role}>…your tagline…</p>
```

### Change the colour palette
All colours live in `app/globals.css` as CSS custom properties:
```css
--c-amber: #e8a050;   /* warm practical light */
--c-ice:   #a8c8f0;   /* monitor bounce light */
```

### Update projects
Edit the `PROJECTS` array in `components/WorkSection/WorkSection.tsx`.

### Three.js particle tuning
In `CinematicLayer.tsx`:
- `PARTICLE_COUNT` — number of fine particles (default 380)
- `BOKEH_COUNT`    — number of large soft orbs (default 55)
- `speeds[i]`      — drift speed per particle
- `amplitudes[i]`  — drift distance
- `mat.opacity`    — particle brightness

### Replace the video
Drop any `.mp4` file at `public/hero.mp4`. The `VIDEO_SRC` constant in
`VideoIntro.tsx` points to `/hero.mp4` — update that path if you rename it.

---

## Architecture Notes

### Why `"use client"` everywhere?
Three.js, GSAP, and video elements require DOM/browser APIs.  
The App Router's server components are used for layout metadata only.

### GSAP ScrollTrigger
`WorkSection`, `AboutSection`, and `ContactSection` register
`ScrollTrigger` inside `gsap.context()` and revert on unmount — no memory
leaks.

### Three.js cleanup
`CinematicLayer` disposes all geometries, materials, and textures on
unmount via the stored `__cinematicCleanup` callback. The renderer is also
disposed, releasing the WebGL context.

### CSS Modules specificity
All component styles are scoped. Global resets live only in `globals.css`.
No class name collisions possible across components.

### Performance
- `will-change: transform` on animated elements
- `requestAnimationFrame` loop (not `setInterval`)
- Pixel ratio capped at `1.5` for Three.js renderer
- `passive: true` on all scroll/mouse event listeners
- GSAP animations use `opacity` and `transform` only (compositor-only)

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next    | 14.2    | App Router framework |
| react   | 18.3    | UI |
| gsap    | 3.12    | Animations + ScrollTrigger |
| three   | 0.164   | WebGL particle layer |

---

## License
MIT — use freely, credit appreciated.
