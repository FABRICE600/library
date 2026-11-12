"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import type { Effect } from "@/lib/effects-data";
import { cn } from "@/lib/utils";

/**
 * Some effects are designed for a specific canvas tone (e.g. white neon text
 * needs a dark canvas; dark checkbox label text needs a light one). Anything
 * not listed here follows the active site theme.
 */
const STAGE_OVERRIDE: Record<string, "light" | "dark"> = {
  "btn-neon": "dark",
  "btn-shimmer": "light",
  "card-glass": "dark",
  "card-gradient-border": "dark",
  "text-neon": "dark",
  "text-glitch": "dark",
  "text-shimmer": "dark",
  "bg-aurora": "dark",
  "bg-grid": "dark",
  "loader-bar": "dark",
  "misc-checkbox": "light",
  "misc-typewriter": "light",
  "misc-bounce-ball": "light",
};

interface EffectPreviewProps {
  effect: Effect;
}

export function EffectPreview({ effect }: EffectPreviewProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const override = STAGE_OVERRIDE[effect.id];
  // Before mount, default to dark (matches the app defaultTheme) to avoid a
  // hydration mismatch; resolve to the real theme once mounted.
  const effectiveTheme = mounted ? resolvedTheme : "dark";
  const isDarkStage = override ? override === "dark" : effectiveTheme !== "light";

  // Ripple: buttons that opt in via `data-ripple` get an expanding ripple span
  // spawned at the click position. Handled via event delegation on the stage so
  // it stays in sync with React's lifecycle.
  function handleStageClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLElement).closest<HTMLElement>(
      "[data-ripple]"
    );
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "fx-ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    target.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 650);
  }

  return (
    <div
      onClick={handleStageClick}
      className={cn(
        "relative flex min-h-[230px] w-full items-center justify-center overflow-hidden p-6 transition-colors",
        isDarkStage
          ? "bg-[#0d1117] text-zinc-100"
          : "bg-zinc-100 text-zinc-900"
      )}
      style={{
        backgroundImage: isDarkStage
          ? "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 55%)"
          : "radial-gradient(circle at 50% 0%, rgba(0,0,0,0.04), transparent 55%)",
      }}
      aria-label={`Live preview of ${effect.name}`}
    >
      {/* Inject the effect's CSS. Class names are unique per effect, so there
          are no collisions between cards. */}
      <style dangerouslySetInnerHTML={{ __html: effect.css }} />
      {/* Render the effect's HTML markup verbatim. */}
      <div
        className="fx-preview-content flex w-full items-center justify-center"
        dangerouslySetInnerHTML={{ __html: effect.html }}
      />
    </div>
  );
}
