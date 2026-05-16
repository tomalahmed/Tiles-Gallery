import Link from "next/link";
import SectionTitle from "@/components/ui/section-title";
import CardShell from "@/components/ui/card-shell";

export default function TradeAccessPage() {
  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Trade Program"
        title="Request Trade Access"
        subtitle="Apply to unlock professional pricing, dedicated support, and curated project recommendations."
      />
      <CardShell className="space-y-4">
        <p className="text-sm text-(--color-text-muted)">
          To join the Aesthetique Tiles trade program, please send your firm details and project profile to our team.
        </p>
        <a
          href="mailto:service.natomal@gmail.com?subject=Trade%20Access%20Request"
          className="inline-flex items-center rounded-sm bg-(--color-primary) px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#1a1611] uppercase transition hover:opacity-90"
        >
          Submit Request
        </a>
        <p className="text-xs text-(--color-text-muted)">
          Already approved?{" "}
          <Link href="/login" className="font-semibold text-(--color-primary) hover:underline">
            Sign in
          </Link>
        </p>
      </CardShell>
    </div>
  );
}
