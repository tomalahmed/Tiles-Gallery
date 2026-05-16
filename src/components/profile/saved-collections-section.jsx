"use client";

import { useState } from "react";
import Link from "next/link";
import SavedTilesGrid from "@/components/profile/saved-tiles-grid";

export default function SavedCollectionsSection({ initialTiles = [] }) {
  const [savedCount, setSavedCount] = useState(initialTiles.length);

  return (
    <>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_2fr]">
        <div className="rounded-sm border border-(--color-border) bg-(--color-surface) p-5 md:p-6">
          <p className="text-[10px] tracking-[0.16em] text-(--color-text-muted)">SAVED TEXTURES</p>
          <p className="mt-2 text-4xl font-semibold text-foreground md:text-5xl">{savedCount}</p>
          <p className="mt-2 text-xs text-(--color-text-muted)">Tiles saved to your personal design shortlist.</p>
        </div>

        <div className="rounded-sm border border-(--color-border) bg-(--color-surface) p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">Saved Collections</h2>
            <Link href="/all-tiles" className="text-xs tracking-[0.14em] text-(--color-primary) transition hover:underline">
              VIEW ALL
            </Link>
          </div>
          <p className="mt-2 text-sm text-(--color-text-muted)">Your shortlisted textures ready for quick comparison.</p>
        </div>
      </section>

      <section className="space-y-5">
        <SavedTilesGrid initialTiles={initialTiles} onCountChange={setSavedCount} />
      </section>
    </>
  );
}

