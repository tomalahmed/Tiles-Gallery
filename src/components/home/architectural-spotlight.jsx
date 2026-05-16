import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import CardShell from "@/components/ui/card-shell";

const spotlightContent = {
  sectionLabel: "Architectural Spotlight",
  eyebrow: "Seasonal Highlight",
  title: "The Sandstone Collection",
  description:
    "Inspired by warm-swept landscapes of the Mediterranean coast, this collection brings organic warmth and tactile serenity to contemporary living spaces.",
  ctaLabel: "Explore the Collection",
  ctaHref: "/all-tiles?category=marble",
  imageSrc: "/banner.jpg",
  imageAlt: "Luxury sandstone-inspired bathroom interior",
};

export default function ArchitecturalSpotlight() {
  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-3xl font-semibold text-foreground">{spotlightContent.sectionLabel}</h2>
      <CardShell className="overflow-hidden p-0">
        <div className="relative h-[320px] w-full md:h-[420px]">
          <Image
            src={spotlightContent.imageSrc}
            alt={spotlightContent.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
        <div className="space-y-4 px-6 py-8 md:px-10">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-(--color-accent) uppercase">
            {spotlightContent.eyebrow}
          </p>
          <h3 className="text-4xl font-semibold text-foreground">{spotlightContent.title}</h3>
          <p className="max-w-3xl text-sm leading-relaxed text-(--color-text-muted)">
            {spotlightContent.description}
          </p>
          <Button as={Link} href={spotlightContent.ctaHref}>
            {spotlightContent.ctaLabel}
          </Button>
        </div>
      </CardShell>
    </section>
  );
}
