import Link from "next/link";
import SectionTitle from "@/components/ui/section-title";
import CardShell from "@/components/ui/card-shell";

export default function TradeTermsPage() {
  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Legal"
        title="Trade Terms & Conditions"
        subtitle="Core eligibility and usage terms for architectural and trade customers."
      />
      <CardShell className="space-y-4">
        <ul className="list-disc space-y-2 pl-5 text-sm text-(--color-text-muted)">
          <li>Trade pricing is available to approved professionals and registered firms only.</li>
          <li>All sample requests are subject to availability and project suitability.</li>
          <li>Quotations and inventory confirmations may vary by collection and lead time.</li>
          <li>Commercial orders are confirmed only after specification and payment approval.</li>
        </ul>
        <p className="text-xs text-(--color-text-muted)">
          Need full legal documentation?{" "}
          <a href="mailto:service.natomal@gmail.com" className="font-semibold text-(--color-primary) hover:underline">
            Contact support
          </a>
          .
        </p>
        <Link href="/register" className="text-sm font-semibold text-(--color-primary) hover:underline">
          Back to Registration
        </Link>
      </CardShell>
    </div>
  );
}
