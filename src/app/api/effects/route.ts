import { NextRequest, NextResponse } from "next/server";
import {
  EFFECTS,
  CATEGORIES,
  filterEffects,
  getCategoryCounts,
  type EffectCategory,
} from "@/lib/effects-data";

export const dynamic = "force-static";

// We compute on demand; the route is marked force-static so Next.js can cache
// the no-query variant at build time, while still answering query params.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const effects = filterEffects({ category, search });

  return NextResponse.json({
    effects,
    categories: ["All", ...CATEGORIES] as Array<"All" | EffectCategory>,
    counts: getCategoryCounts(),
    total: EFFECTS.length,
  });
}
