import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCompassDrafting, faFileSignature, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import SectionTitle from "@/components/ui/section-title";
import CardShell from "@/components/ui/card-shell";

export default function ArchitectsPage() {
  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Architects"
        title="Architect Resource Hub"
        subtitle="A focused environment for technical details, palette strategy, and project-ready material selection."
      />

      <CardShell className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="relative min-h-[280px]">
            <Image
              src="/banner.jpg"
              alt="Architectural planning visuals"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
          <div className="space-y-5 p-6 md:p-8">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-(--color-accent) uppercase">
              <FontAwesomeIcon icon={faBuilding} className="h-3.5 w-3.5" />
              Architect Program
            </div>
            <h2 className="text-3xl font-semibold text-foreground">Design Faster with Structured Material Intelligence</h2>
            <p className="text-sm leading-relaxed text-(--color-text-muted)">
              Centralize surface decisions with curated references, robust technical context, and consistent selection workflows
              across your active projects.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/all-tiles"
                className="inline-flex items-center justify-center rounded-sm bg-(--color-primary) px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#1a1611] uppercase transition hover:opacity-90"
              >
                Start Shortlisting
              </Link>
              <Link
                href="/all-tiles"
                className="inline-flex items-center justify-center rounded-sm border border-(--color-border) px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-foreground uppercase transition hover:border-(--color-primary)"
              >
                Browse Tiles
              </Link>
            </div>
          </div>
        </div>
      </CardShell>

      <div className="grid gap-4 md:grid-cols-3">
        <CardShell className="space-y-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-(--color-primary)/15 text-(--color-primary)">
            <FontAwesomeIcon icon={faCompassDrafting} className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Specification Support</h3>
          <p className="text-sm text-(--color-text-muted)">
            Compare material options quickly and align technical fit with architectural intent.
          </p>
        </CardShell>
        <CardShell className="space-y-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-(--color-primary)/15 text-(--color-primary)">
            <FontAwesomeIcon icon={faFileSignature} className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Project Documentation</h3>
          <p className="text-sm text-(--color-text-muted)">
            Keep decisions organized with clearer handoff context for procurement and project teams.
          </p>
        </CardShell>
        <CardShell className="space-y-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-(--color-primary)/15 text-(--color-primary)">
            <FontAwesomeIcon icon={faLayerGroup} className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Collection Strategy</h3>
          <p className="text-sm text-(--color-text-muted)">
            Build cohesive surface ecosystems by combining tonal families and texture hierarchies.
          </p>
        </CardShell>
      </div>
    </div>
  );
}
