export type EffectCategory =
  | "Buttons"
  | "Cards"
  | "Loaders"
  | "Text"
  | "Backgrounds"
  | "Misc";

export interface Effect {
  id: string;
  name: string;
  category: EffectCategory;
  description: string;
  /** HTML snippet shown to the user and executed in the preview. */
  html: string;
  /** CSS code shown to the user and executed in the preview. Uses unique class names. */
  css: string;
  tags: string[];
}

export const CATEGORIES: EffectCategory[] = [
  "Buttons",
  "Cards",
  "Loaders",
  "Text",
  "Backgrounds",
  "Misc",
];

export const EFFECTS: Effect[] = [
  // ───────────────────────── BUTTONS ─────────────────────────
  {
    id: "btn-gradient",
    name: "Animated Gradient Button",
    category: "Buttons",
    description:
      "A button with a living, animated gradient background that shifts hues continuously.",
    tags: ["gradient", "animation", "hover"],
    html: `<button class="fx-gradient-btn">Get Started</button>`,
    css: `.fx-gradient-btn {
  position: relative;
  padding: 14px 38px;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.4px;
  cursor: pointer;
  background: linear-gradient(120deg, #f43f5e, #f59e0b, #ec4899, #f43f5e);
  background-size: 300% 300%;
  box-shadow: 0 10px 30px -10px rgba(244, 63, 94, 0.6);
  animation: fx-gradient-shift 6s ease infinite;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.fx-gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 38px -10px rgba(244, 63, 94, 0.75);
}

.fx-gradient-btn:active {
  transform: translateY(0);
}

@keyframes fx-gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
  },
  {
    id: "btn-neon",
    name: "Neon Glow Button",
    category: "Buttons",
    description:
      "A glowing neon button with an animated border ring and pulsing glow halo.",
    tags: ["neon", "glow", "border"],
    html: `<button class="fx-neon-btn"><span>Launch</span></button>`,
    css: `.fx-neon-btn {
  position: relative;
  padding: 14px 40px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #0ea5e9;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.3s ease;
}

.fx-neon-btn span {
  position: relative;
  z-index: 2;
}

.fx-neon-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: #0ea5e9;
  border-radius: 10px;
  filter: blur(22px);
  opacity: 0.55;
  animation: fx-neon-pulse 2.2s ease-in-out infinite;
}

.fx-neon-btn::after {
  content: "";
  position: absolute;
  inset: 2px;
  z-index: 1;
  border-radius: 9px;
  background: #06121c;
}

.fx-neon-btn:hover {
  color: #e0f7ff;
}

.fx-neon-btn:hover::before {
  opacity: 0.95;
}

@keyframes fx-neon-pulse {
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50%      { opacity: 0.9;  transform: scale(1.04); }
}`,
  },
  {
    id: "btn-3d-push",
    name: "3D Push Button",
    category: "Buttons",
    description:
      "A tactile 3D button that physically depresses when pressed, complete with a shadow base.",
    tags: ["3d", "press", "tactile"],
    html: `<button class="fx-3d-btn">Press Me</button>`,
    css: `.fx-3d-btn {
  position: relative;
  display: inline-block;
  padding: 14px 34px;
  border: none;
  border-radius: 12px;
  background: #10b981;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow:
    0 6px 0 #047857,
    0 8px 18px rgba(16, 185, 129, 0.4);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.fx-3d-btn:hover {
  background: #05c98b;
}

.fx-3d-btn:active {
  transform: translateY(6px);
  box-shadow:
    0 0 0 #047857,
    0 1px 6px rgba(16, 185, 129, 0.4);
}`,
  },
  {
    id: "btn-shimmer",
    name: "Shimmer Button",
    category: "Buttons",
    description:
      "A solid button with a sweeping light band that travels across its surface on hover.",
    tags: ["shimmer", "hover", "light"],
    html: `<button class="fx-shimmer-btn">Continue</button>`,
    css: `.fx-shimmer-btn {
  position: relative;
  overflow: hidden;
  padding: 14px 38px;
  border: none;
  border-radius: 10px;
  background: #18181b;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  isolation: isolate;
}

.fx-shimmer-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: -120%;
  width: 80%;
  height: 100%;
  background: linear-gradient(
    100deg,
    transparent,
    rgba(255, 255, 255, 0.35),
    transparent
  );
  transform: skewX(-18deg);
  transition: left 0.6s ease;
}

.fx-shimmer-btn:hover::after {
  left: 140%;
}

.fx-shimmer-btn:active {
  transform: scale(0.97);
}`,
  },
  {
    id: "btn-ripple",
    name: "Ripple Button",
    category: "Buttons",
    description:
      "A button that spawns an expanding ripple from wherever you click — no JavaScript required via this demo markup.",
    tags: ["ripple", "click", "interactive"],
    html: `<button class="fx-ripple-btn" data-ripple>Tap Here</button>`,
    css: `.fx-ripple-btn {
  position: relative;
  overflow: hidden;
  padding: 14px 36px;
  border: none;
  border-radius: 999px;
  background: #6366f1;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 24px -8px rgba(99, 102, 241, 0.7);
  transition: box-shadow 0.25s ease;
}

.fx-ripple-btn:hover {
  box-shadow: 0 12px 30px -8px rgba(99, 102, 241, 0.85);
}

/* The ripple is generated on click by a tiny script in the preview.
   This CSS defines how it looks and animates. */
.fx-ripple-btn .fx-ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  background: rgba(255, 255, 255, 0.55);
  animation: fx-ripple-go 0.6s ease-out forwards;
  pointer-events: none;
}

@keyframes fx-ripple-go {
  to {
    transform: scale(4);
    opacity: 0;
  }
}`,
  },

  // ───────────────────────── CARDS ─────────────────────────
  {
    id: "card-glass",
    name: "Glassmorphism Card",
    category: "Cards",
    description:
      "A frosted-glass card with backdrop blur, translucent layers and a soft glowing backdrop.",
    tags: ["glass", "blur", "modern"],
    html: `<div class="fx-glass-stage">
  <div class="fx-glass-card">
    <h3>Glassmorphism</h3>
    <p>Frosted, translucent surfaces with depth.</p>
    <button>Read more</button>
  </div>
</div>`,
    css: `.fx-glass-stage {
  position: relative;
  width: 100%;
  padding: 28px;
  border-radius: 16px;
  background:
    radial-gradient(circle at 20% 20%, #f43f5e, transparent 55%),
    radial-gradient(circle at 80% 30%, #8b5cf6, transparent 55%),
    radial-gradient(circle at 50% 90%, #f59e0b, transparent 55%),
    #0f172a;
  overflow: hidden;
}

.fx-glass-card {
  max-width: 280px;
  padding: 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  color: #fff;
}

.fx-glass-card h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.fx-glass-card p {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.85;
}

.fx-glass-card button {
  padding: 9px 18px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.fx-glass-card button:hover {
  background: rgba(255, 255, 255, 0.32);
}`,
  },
  {
    id: "card-gradient-border",
    name: "Animated Gradient Border Card",
    category: "Cards",
    description:
      "A card whose border is a rotating conic gradient, revealed through a masked frame.",
    tags: ["border", "gradient", "conic"],
    html: `<div class="fx-border-card">
  <div class="fx-border-card-inner">
    <h3>Gradient Border</h3>
    <p>The frame rotates a conic gradient forever.</p>
  </div>
</div>`,
    css: `.fx-border-card {
  position: relative;
  width: 100%;
  max-width: 300px;
  padding: 2px;
  border-radius: 16px;
  overflow: hidden;
  background: #0b1220;
}

.fx-border-card::before {
  content: "";
  position: absolute;
  inset: -50%;
  background: conic-gradient(
    from 0deg,
    #f43f5e,
    #f59e0b,
    #10b981,
    #06b6d4,
    #8b5cf6,
    #f43f5e
  );
  animation: fx-border-spin 6s linear infinite;
}

.fx-border-card-inner {
  position: relative;
  z-index: 1;
  padding: 26px;
  border-radius: 15px;
  background: #0f172a;
  color: #e2e8f0;
}

.fx-border-card-inner h3 {
  margin: 0 0 8px;
  font-size: 19px;
  font-weight: 700;
}

.fx-border-card-inner p {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: #94a3b8;
}

@keyframes fx-border-spin {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: "card-hover-lift",
    name: "Hover Lift Card",
    category: "Cards",
    description:
      "A clean card that lifts, casts a deeper shadow and reveals an accent bar on hover.",
    tags: ["hover", "lift", "shadow"],
    html: `<div class="fx-lift-card">
  <div class="fx-lift-card-bar"></div>
  <h3>Lift on Hover</h3>
  <p>A subtle, satisfying interaction for content cards.</p>
</div>`,
    css: `.fx-lift-card {
  position: relative;
  width: 100%;
  max-width: 280px;
  padding: 24px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
              box-shadow 0.3s ease;
}

.fx-lift-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.25);
}

.fx-lift-card-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(#f43f5e, #f59e0b);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s ease;
}

.fx-lift-card:hover .fx-lift-card-bar {
  transform: scaleY(1);
}

.fx-lift-card h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.fx-lift-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: #64748b;
}`,
  },
  {
    id: "card-flip",
    name: "3D Flip Card",
    category: "Cards",
    description:
      "A card that flips in 3D to reveal its back face when hovered, using preserve-3d.",
    tags: ["3d", "flip", "hover"],
    html: `<div class="fx-flip-card">
  <div class="fx-flip-card-inner">
    <div class="fx-flip-card-front">
      <span>Hover to flip</span>
    </div>
    <div class="fx-flip-card-back">
      <span>Surprise!</span>
    </div>
  </div>
</div>`,
    css: `.fx-flip-card {
  width: 220px;
  height: 150px;
  perspective: 1000px;
}

.fx-flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}

.fx-flip-card:hover .fx-flip-card-inner {
  transform: rotateY(180deg);
}

.fx-flip-card-front,
.fx-flip-card-back {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.fx-flip-card-front {
  background: linear-gradient(135deg, #f43f5e, #f59e0b);
}

.fx-flip-card-back {
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  transform: rotateY(180deg);
}`,
  },

  // ───────────────────────── LOADERS ─────────────────────────
  {
    id: "loader-spinner",
    name: "Dual Ring Spinner",
    category: "Loaders",
    description:
      "A spinner built from two counter-rotating gradient rings for a refined loading state.",
    tags: ["spinner", "loading", "ring"],
    html: `<div class="fx-spinner" aria-label="Loading"></div>`,
    css: `.fx-spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background:
    conic-gradient(from 0deg, transparent 0 65%, #f43f5e 65% 100%);
  -webkit-mask: radial-gradient(circle, transparent 58%, #000 60%);
          mask: radial-gradient(circle, transparent 58%, #000 60%);
  animation: fx-spin 1s linear infinite;
}

@keyframes fx-spin {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: "loader-dots",
    name: "Bouncing Dots",
    category: "Loaders",
    description:
      "Three dots that bounce in sequence — a classic, friendly loading indicator.",
    tags: ["dots", "bounce", "loading"],
    html: `<div class="fx-dots" aria-label="Loading">
  <span></span><span></span><span></span>
</div>`,
    css: `.fx-dots {
  display: inline-flex;
  gap: 12px;
}

.fx-dots span {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #6366f1;
  animation: fx-dots-bounce 1.2s ease-in-out infinite;
}

.fx-dots span:nth-child(2) { animation-delay: 0.18s; }
.fx-dots span:nth-child(3) { animation-delay: 0.36s; }

@keyframes fx-dots-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
  40%           { transform: translateY(-14px); opacity: 1; }
}`,
  },
  {
    id: "loader-pulse",
    name: "Pulsing Heart",
    category: "Loaders",
    description:
      "A soft pulsing ring that breathes in and out — calm and minimal.",
    tags: ["pulse", "loading", "minimal"],
    html: `<div class="fx-pulse" aria-label="Loading"></div>`,
    css: `.fx-pulse {
  position: relative;
  width: 56px;
  height: 56px;
}

.fx-pulse::before,
.fx-pulse::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #10b981;
  animation: fx-pulse-go 1.6s ease-out infinite;
}

.fx-pulse::after {
  animation-delay: 0.8s;
}

@keyframes fx-pulse-go {
  0%   { transform: scale(0.4); opacity: 0.8; }
  100% { transform: scale(1.4); opacity: 0; }
}`,
  },
  {
    id: "loader-bar",
    name: "Indeterminate Bar",
    category: "Loaders",
    description:
      "A progress bar with an indeterminate traveling block, ideal for unknown durations.",
    tags: ["bar", "progress", "loading"],
    html: `<div class="fx-bar"><div class="fx-bar-fill"></div></div>`,
    css: `.fx-bar {
  width: 220px;
  height: 6px;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
}

.fx-bar-fill {
  width: 40%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #f43f5e, #f59e0b);
  animation: fx-bar-slide 1.3s ease-in-out infinite;
}

@keyframes fx-bar-slide {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}`,
  },

  // ───────────────────────── TEXT ─────────────────────────
  {
    id: "text-gradient",
    name: "Animated Gradient Text",
    category: "Text",
    description:
      "Text filled with a moving multi-color gradient using background-clip.",
    tags: ["gradient", "text", "animation"],
    html: `<h2 class="fx-gradient-text">Beautiful CSS</h2>`,
    css: `.fx-gradient-text {
  margin: 0;
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(120deg, #f43f5e, #f59e0b, #10b981, #06b6d4, #f43f5e);
  background-size: 300% 300%;
  -webkit-background-clip: text;
          background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: fx-gradient-text-shift 8s ease infinite;
}

@keyframes fx-gradient-text-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
  },
  {
    id: "text-neon",
    name: "Neon Sign Text",
    category: "Text",
    description:
      "Text that glows like a neon sign with layered colored shadows and a subtle flicker.",
    tags: ["neon", "glow", "text"],
    html: `<h2 class="fx-neon-text">NEON</h2>`,
    css: `.fx-neon-text {
  margin: 0;
  font-size: 52px;
  font-weight: 800;
  letter-spacing: 6px;
  color: #fff;
  text-shadow:
    0 0 6px #fff,
    0 0 14px #fff,
    0 0 26px #ff4da6,
    0 0 40px #ff4da6,
    0 0 60px #ff4da6;
  animation: fx-neon-flicker 3.5s infinite alternate;
}

@keyframes fx-neon-flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow:
      0 0 6px #fff,
      0 0 14px #fff,
      0 0 26px #ff4da6,
      0 0 40px #ff4da6,
      0 0 60px #ff4da6;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}`,
  },
  {
    id: "text-glitch",
    name: "Glitch Text",
    category: "Text",
    description:
      "A cyberpunk glitch effect with RGB-split clones that jitter using pseudo-elements.",
    tags: ["glitch", "rgb", "text"],
    html: `<h2 class="fx-glitch-text" data-text="GLITCH">GLITCH</h2>`,
    css: `.fx-glitch-text {
  position: relative;
  margin: 0;
  font-size: 46px;
  font-weight: 800;
  letter-spacing: 4px;
  color: #fff;
}

.fx-glitch-text::before,
.fx-glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  overflow: hidden;
}

.fx-glitch-text::before {
  color: #00fff9;
  animation: fx-glitch-top 2.5s infinite linear alternate-reverse;
  clip-path: inset(0 0 60% 0);
}

.fx-glitch-text::after {
  color: #ff00c1;
  animation: fx-glitch-bottom 2s infinite linear alternate-reverse;
  clip-path: inset(60% 0 0 0);
}

@keyframes fx-glitch-top {
  0%   { transform: translate(0); }
  20%  { transform: translate(-4px, -2px); }
  40%  { transform: translate(-3px, 1px); }
  60%  { transform: translate(3px, -1px); }
  80%  { transform: translate(2px, 2px); }
  100% { transform: translate(0); }
}

@keyframes fx-glitch-bottom {
  0%   { transform: translate(0); }
  20%  { transform: translate(4px, 2px); }
  40%  { transform: translate(3px, -1px); }
  60%  { transform: translate(-3px, 1px); }
  80%  { transform: translate(-2px, -2px); }
  100% { transform: translate(0); }
}`,
  },
  {
    id: "text-shimmer",
    name: "Shimmer Text",
    category: "Text",
    description:
      "A skeleton-style shimmer sweep across text, great for loading headlines.",
    tags: ["shimmer", "text", "loading"],
    html: `<h2 class="fx-shimmer-text">Loading content</h2>`,
    css: `.fx-shimmer-text {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: transparent;
  background: linear-gradient(
    100deg,
    #cbd5e1 30%,
    #ffffff 50%,
    #cbd5e1 70%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
          background-clip: text;
  animation: fx-shimmer-text-go 1.6s linear infinite;
}

@keyframes fx-shimmer-text-go {
  to { background-position: -200% 0; }
}`,
  },

  // ───────────────────────── BACKGROUNDS ─────────────────────────
  {
    id: "bg-animated-gradient",
    name: "Animated Gradient Background",
    category: "Backgrounds",
    description:
      "A full-bleed background whose gradient drifts slowly, creating a calm living surface.",
    tags: ["gradient", "background", "animation"],
    html: `<div class="fx-bg-gradient"></div>`,
    css: `.fx-bg-gradient {
  width: 100%;
  height: 180px;
  border-radius: 14px;
  background: linear-gradient(125deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #6366f1);
  background-size: 400% 400%;
  animation: fx-bg-gradient-move 12s ease infinite;
}

@keyframes fx-bg-gradient-move {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
  },
  {
    id: "bg-aurora",
    name: "Aurora Background",
    category: "Backgrounds",
    description:
      "Soft blurred aurora ribbons drifting across a dark sky using radial gradients and blur.",
    tags: ["aurora", "blur", "background"],
    html: `<div class="fx-aurora">
  <div class="fx-aurora-blob fx-aurora-a"></div>
  <div class="fx-aurora-blob fx-aurora-b"></div>
  <div class="fx-aurora-blob fx-aurora-c"></div>
</div>`,
    css: `.fx-aurora {
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: 14px;
  background: #0b1020;
  overflow: hidden;
}

.fx-aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.7;
}

.fx-aurora-a {
  width: 260px; height: 260px;
  background: #22d3ee;
  top: -60px; left: -40px;
  animation: fx-aurora-float 14s ease-in-out infinite;
}

.fx-aurora-b {
  width: 240px; height: 240px;
  background: #a855f7;
  top: 20px; left: 45%;
  animation: fx-aurora-float 18s ease-in-out infinite reverse;
}

.fx-aurora-c {
  width: 220px; height: 220px;
  background: #f43f5e;
  bottom: -70px; right: -30px;
  animation: fx-aurora-float 16s ease-in-out infinite;
}

@keyframes fx-aurora-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(40px, 30px) scale(1.15); }
  66%      { transform: translate(-30px, 20px) scale(0.9); }
}`,
  },
  {
    id: "bg-grid",
    name: "Animated Grid Background",
    category: "Backgrounds",
    description:
      "A perspective grid that scrolls toward the viewer — a retro-futuristic stage.",
    tags: ["grid", "retro", "background"],
    html: `<div class="fx-grid"></div>`,
    css: `.fx-grid {
  width: 100%;
  height: 180px;
  border-radius: 14px;
  background:
    linear-gradient(180deg, rgba(2,6,23,0.2), #020617),
    linear-gradient(rgba(34,211,238,0.35) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34,211,238,0.35) 1px, transparent 1px);
  background-size: 100% 100%, 100% 28px, 28px 28px;
  animation: fx-grid-scroll 1.4s linear infinite;
}

@keyframes fx-grid-scroll {
  from { background-position: 0 0, 0 0, 0 0; }
  to   { background-position: 0 0, 0 28px, 0 0; }
}`,
  },

  // ───────────────────────── MISC ─────────────────────────
  {
    id: "misc-float",
    name: "Floating Element",
    category: "Misc",
    description:
      "A gentle up-and-down float with a soft rotation — perfect for hero illustrations.",
    tags: ["float", "animation", "hero"],
    html: `<div class="fx-float-stage">
  <div class="fx-float-orb"></div>
</div>`,
    css: `.fx-float-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
}

.fx-float-orb {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fef3c7, #f59e0b 60%, #b45309);
  box-shadow: 0 18px 40px -12px rgba(245, 158, 11, 0.7);
  animation: fx-float-go 4s ease-in-out infinite;
}

@keyframes fx-float-go {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-22px) rotate(8deg); }
}`,
  },
  {
    id: "misc-checkbox",
    name: "Custom Checkbox",
    category: "Misc",
    description:
      "A pure-CSS custom checkbox with an animated checkmark draw on a brand-colored tile.",
    tags: ["checkbox", "form", "input"],
    html: `<label class="fx-check">
  <input type="checkbox" />
  <span class="fx-check-box">
    <svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6" /></svg>
  </span>
  <span class="fx-check-label">Accept terms</span>
</label>`,
    css: `.fx-check {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  font-size: 15px;
  color: #0f172a;
}

.fx-check input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.fx-check-box {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 2px solid #cbd5e1;
  background: #fff;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.fx-check-box svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  transition: stroke-dashoffset 0.3s ease 0.05s;
}

.fx-check input:checked + .fx-check-box {
  background: #10b981;
  border-color: #10b981;
}

.fx-check input:checked + .fx-check-box svg {
  stroke-dashoffset: 0;
}

.fx-check input:focus-visible + .fx-check-box {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.35);
}`,
  },
  {
    id: "misc-typewriter",
    name: "Typewriter Effect",
    category: "Misc",
    description:
      "Text that types itself out and blinks a caret — built with steps() timing.",
    tags: ["typewriter", "text", "animation"],
    html: `<p class="fx-type">Hello, CSS world.</p>`,
    css: `.fx-type {
  display: inline-block;
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 22px;
  font-weight: 600;
  color: #0f172a;
  border-right: 3px solid #f43f5e;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  animation:
    fx-type-go 2.4s steps(16) forwards,
    fx-type-caret 0.7s step-end infinite;
}

@keyframes fx-type-go {
  to { width: 16ch; }
}

@keyframes fx-type-caret {
  50% { border-color: transparent; }
}`,
  },
  {
    id: "misc-bounce-ball",
    name: "Bouncing Ball",
    category: "Misc",
    description:
      "A ball that bounces with a squashing shadow that grows and shrinks for realism.",
    tags: ["bounce", "ball", "animation"],
    html: `<div class="fx-bounce-stage">
  <div class="fx-bounce-ball"></div>
  <div class="fx-bounce-shadow"></div>
</div>`,
    css: `.fx-bounce-stage {
  position: relative;
  width: 120px;
  height: 160px;
}

.fx-bounce-ball {
  position: absolute;
  left: 50%;
  top: 0;
  width: 48px;
  height: 48px;
  margin-left: -24px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fbcfe8, #ec4899 60%, #be185d);
  animation: fx-bounce-up 1.1s cubic-bezier(0.5, 0.05, 0.5, 0.95) infinite alternate;
}

.fx-bounce-shadow {
  position: absolute;
  bottom: 6px;
  left: 50%;
  width: 50px;
  height: 10px;
  margin-left: -25px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.25);
  animation: fx-bounce-shadow 1.1s cubic-bezier(0.5, 0.05, 0.5, 0.95) infinite alternate;
}

@keyframes fx-bounce-up {
  0%   { transform: translateY(0) scaleY(1); }
  100% { transform: translateY(110px) scaleY(0.85); }
}

@keyframes fx-bounce-shadow {
  0%   { transform: scale(0.6); opacity: 0.5; }
  100% { transform: scale(1); opacity: 0.2; }
}`,
  },
];

export function filterEffects(opts: {
  category?: string;
  search?: string;
}): Effect[] {
  const category = opts.category?.trim();
  const search = opts.search?.trim().toLowerCase();

  return EFFECTS.filter((effect) => {
    const matchesCategory =
      !category ||
      category === "All" ||
      effect.category === category;
    const matchesSearch =
      !search ||
      effect.name.toLowerCase().includes(search) ||
      effect.description.toLowerCase().includes(search) ||
      effect.tags.some((t) => t.toLowerCase().includes(search));
    return matchesCategory && matchesSearch;
  });
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: EFFECTS.length };
  for (const c of CATEGORIES) counts[c] = 0;
  for (const e of EFFECTS) counts[e.category] += 1;
  return counts;
}
