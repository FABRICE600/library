"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EffectPreview } from "./effect-preview";
import { CodeBlock } from "./code-block";
import type { Effect, EffectCategory } from "@/lib/effects-data";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<EffectCategory, string> = {
  Buttons:
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  Cards:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Loaders:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Text: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20",
  Backgrounds:
    "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  Misc: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
};

interface EffectCardProps {
  effect: Effect;
}

export function EffectCard({ effect }: EffectCardProps) {
  return (
    <Card
      className={cn(
        "group min-w-0 overflow-hidden p-0 gap-0 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40"
      )}
    >
      <CardHeader className="gap-2 px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-base">{effect.name}</CardTitle>
            <CardDescription className="mt-1.5 leading-relaxed">
              {effect.description}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={cn("shrink-0", CATEGORY_STYLES[effect.category])}
          >
            {effect.category}
          </Badge>
        </div>
        {effect.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {effect.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardHeader>

      <EffectPreview effect={effect} />

      <div className="min-w-0 p-5">
        <Tabs defaultValue="css">
          <TabsList className="mb-3">
            <TabsTrigger value="css" className="text-xs">
              CSS
            </TabsTrigger>
            <TabsTrigger value="html" className="text-xs">
              HTML
            </TabsTrigger>
          </TabsList>
          <TabsContent value="css" className="min-w-0">
            <CodeBlock code={effect.css} language="css" />
          </TabsContent>
          <TabsContent value="html" className="min-w-0">
            <CodeBlock code={effect.html} language="html" maxHeight={220} />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
