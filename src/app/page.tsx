"use client";

import * as React from "react";
import { Search, Sparkles, Wand2, Code2, Layers, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { EffectCard } from "@/components/effects/effect-card";
import { cn } from "@/lib/utils";
import type { Effect } from "@/lib/effects-data";

interface EffectsResponse {
  effects: Effect[];
  categories: string[];
  counts: Record<string, number>;
  total: number;
}

export default function Home() {
  const [data, setData] = React.useState<EffectsResponse | null>(null);
  const [active, setActive] = React.useState<string>("All");
  const [query, setQuery] = React.useState("");
  const [highlightId, setHighlightId] = React.useState<string | null>(null);
  const heroSearchRef = React.useRef<HTMLInputElement>(null);
  const headerSearchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/effects")
      .then((r) => r.json())
      .then((d: EffectsResponse) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        /* keep loading skeleton on error */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // "/" focuses the hero search for a fast keyboard workflow.
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault();
        heroSearchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const effects = data?.effects ?? [];
  const counts = data?.counts ?? {};
  const categories = data?.categories ?? ["All"];

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return effects.filter((e) => {
      const matchesCat = active === "All" || e.category === active;
      const matchesQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)) ||
        e.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [effects, active, query]);

  function surprise() {
    if (effects.length === 0) return;
    const pick = effects[Math.floor(Math.random() * effects.length)];
    setActive("All");
    setQuery("");
    setHighlightId(pick.id);
    window.setTimeout(() => {
      const el = document.getElementById(`effect-${pick.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
    window.setTimeout(() => setHighlightId(null), 1900);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ───────── Header ───────── */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/25">
              <Code2 className="h-5 w-5" />
            </span>
            <span className="hidden text-lg font-bold tracking-tight sm:block">
              CSS<span className="text-rose-500">FX</span>
            </span>
          </a>

          <div className="relative ml-auto hidden w-full max-w-xs items-center md:flex">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              ref={headerSearchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search effects…"
              className="h-9 pl-9"
              aria-label="Search effects"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={surprise}
            className="hidden sm:inline-flex"
          >
            <Wand2 className="h-4 w-4" /> Surprise me
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* ───────── Main ───────── */}
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(60% 50% at 50% 0%, rgba(244,63,94,0.18), transparent 70%), radial-gradient(40% 40% at 80% 20%, rgba(245,158,11,0.16), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="mb-5 border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
              >
                <Sparkles className="h-3 w-3" /> {data?.total ?? "—"} hand-crafted
                effects
              </Badge>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                A library of{" "}
                <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
                  CSS effects
                </span>
                , ready to paste.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
                Live, interactive demos with copy-paste CSS and HTML. Buttons,
                cards, loaders, text, backgrounds and more — zero dependencies,
                pure CSS.
              </p>

              {/* Hero search */}
              <div className="relative mx-auto mt-8 max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={heroSearchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, tag or category… (press /)"
                  className="h-12 rounded-xl pl-12 text-base shadow-sm"
                  aria-label="Search CSS effects"
                />
              </div>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Layers className="h-4 w-4 text-rose-500" />
                  <strong className="font-semibold text-foreground">
                    {data?.total ?? "—"}
                  </strong>{" "}
                  effects
                </span>
                <span className="inline-flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <strong className="font-semibold text-foreground">
                    {data ? data.categories.length - 1 : "—"}
                  </strong>{" "}
                  categories
                </span>
                <span className="inline-flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-emerald-500" />
                  <strong className="font-semibold text-foreground">0</strong>{" "}
                  dependencies
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters + Grid */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Category pills */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = active === cat;
              const count = counts[cat] ?? 0;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  )}
                >
                  {cat}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs",
                      isActive
                        ? "bg-background/20 text-background"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "effect" : "effects"}
              {active !== "All" && (
                <>
                  {" "}
                  in <span className="text-foreground">{active}</span>
                </>
              )}
              {query && (
                <>
                  {" "}
                  for &ldquo;
                  <span className="text-foreground">{query}</span>&rdquo;
                </>
              )}
            </p>
            {(active !== "All" || query) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setActive("All");
                  setQuery("");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          {/* Grid */}
          {!data ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[460px] w-full rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-24 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-muted">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No effects found</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Try a different keyword or clear your filters to see the whole
                library.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-5"
                onClick={() => {
                  setActive("All");
                  setQuery("");
                }}
              >
                Reset
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((effect) => (
                <div
                  key={effect.id}
                  id={`effect-${effect.id}`}
                  className={cn(
                    "min-w-0 rounded-xl transition-all duration-300",
                    highlightId === effect.id &&
                      "ring-2 ring-rose-500/60 ring-offset-2 ring-offset-background"
                  )}
                >
                  <EffectCard effect={effect} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className="mt-auto border-t border-border/60 bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-rose-500 to-amber-500 text-white">
              <Code2 className="h-4 w-4" />
            </span>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                CSS<span className="text-rose-500">FX</span>
              </span>{" "}
              — pure CSS effects, free to use.
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS &amp; shadcn/ui. &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
