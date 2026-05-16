"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ fallbackHref = "/all-tiles", label = "Go Back", className = "" }) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex min-h-10 items-center justify-center rounded-sm border border-(--color-border) px-4 py-2 text-xs tracking-[0.14em] text-(--color-primary) uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-primary) ${className}`.trim()}
    >
      {label}
    </button>
  );
}

