"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { addFavorite, removeFavorite } from "@/lib/favorites-client";
import { cn } from "@/lib/cn";

export default function FavoriteButton({
  tileId,
  initialIsFavorited = false,
  className,
  onStateChange,
  size = "md",
  refreshOnSuccess = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggleFavorite = async () => {
    if (isLoading || isPending) {
      return;
    }

    if (!session?.user) {
      const next = pathname || "/";
      router.push(`/login?next=${encodeURIComponent(next)}`);
      return;
    }

    setError("");
    const nextState = !isFavorited;
    setIsFavorited(nextState);
    setIsLoading(true);

    try {
      if (nextState) {
        await addFavorite(tileId);
      } else {
        await removeFavorite(tileId);
      }

      onStateChange?.(nextState);
      if (refreshOnSuccess) {
        router.refresh();
      }
    } catch (requestError) {
      setIsFavorited(!nextState);
      setError(requestError?.message || "Unable to update favorites.");
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses =
    size === "sm"
      ? "h-8 min-w-8 px-2 text-xs"
      : size === "lg"
        ? "h-10 min-w-10 px-3 text-sm"
        : "h-9 min-w-9 px-2.5 text-xs";

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={handleToggleFavorite}
        disabled={isLoading || (isMounted && isPending)}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        title={isFavorited ? "Remove from favorites" : "Add to favorites"}
        className={cn(
          "inline-flex items-center justify-center rounded-sm border transition-colors disabled:cursor-not-allowed disabled:opacity-70",
          sizeClasses,
          isFavorited
            ? "border-(--color-primary) bg-(--color-primary)/15 text-(--color-primary)"
            : "border-(--color-border) bg-(--color-surface) text-(--color-text-muted) hover:border-(--color-primary) hover:text-(--color-primary)",
          className,
        )}
      >
        <span className="mr-1">{isFavorited ? "♥" : "♡"}</span>
        <span className="tracking-[0.12em] uppercase">{isLoading ? "..." : "Love"}</span>
      </button>

      {error ? <p className="text-[10px] text-red-400">{error}</p> : null}
    </div>
  );
}
