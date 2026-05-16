"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/tiles/favorite-button";

export default function SavedTilesGrid({ initialTiles = [], onCountChange }) {
  const [tiles, setTiles] = useState(initialTiles);
  const [isVisible, setIsVisible] = useState(false);

  const savedCount = useMemo(() => tiles.length, [tiles]);

  useEffect(() => {
    const id = window.setTimeout(() => setIsVisible(true), 20);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (typeof onCountChange === "function") {
      onCountChange(savedCount);
    }
  }, [onCountChange, savedCount]);

  if (!savedCount) {
    return (
      <div
        className={`rounded-sm border border-(--color-border) bg-(--color-surface) p-6 text-center transition-all duration-500 md:p-10 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm border border-(--color-border) bg-background text-lg text-(--color-primary)">
          +
        </div>
        <h3 className="mt-4 text-xl font-semibold text-foreground">No saved collections yet</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-(--color-text-muted)">
          Start curating your shortlist to compare materials and revisit your favorite surfaces faster.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            href="/all-tiles"
            className="inline-flex min-h-11 items-center justify-center border border-(--color-border) bg-(--color-primary) px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#1a1611] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
          >
            EXPLORE ALL TILES
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center border border-(--color-border) px-4 py-2 text-xs tracking-[0.14em] text-(--color-primary) transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-primary)"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tiles.map((tile, index) => (
        <article
          key={tile.id}
          style={{ transitionDelay: `${index * 70}ms` }}
          className={`group overflow-hidden rounded-sm border border-(--color-border) bg-(--color-surface) transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="relative h-56">
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-2 p-4">
            <p className="text-[10px] tracking-[0.16em] text-(--color-text-muted)">{tile.material} SURFACE</p>
            <h3 className="text-xl font-semibold text-foreground">{tile.title}</h3>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-(--color-text-muted)">
                {tile.dimensions} - ${tile.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2">
                <Link href={`/tiles/${tile.id}`} className="text-xs tracking-[0.12em] text-(--color-primary) hover:underline">
                  DETAILS
                </Link>
                <FavoriteButton
                  tileId={tile.id}
                  initialIsFavorited
                  size="sm"
                  onStateChange={(nextState) => {
                    if (!nextState) {
                      setTiles((previousTiles) => previousTiles.filter((currentTile) => currentTile.id !== tile.id));
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
