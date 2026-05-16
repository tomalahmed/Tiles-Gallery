import Link from "next/link";
import SectionTitle from "@/components/ui/section-title";
import CardShell from "@/components/ui/card-shell";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Account Recovery"
        title="Forgot Password"
        subtitle="Password reset automation is coming soon. Contact support for immediate assistance."
      />
      <CardShell className="space-y-3">
        <p className="text-sm text-(--color-text-muted)">
          Please email us from your registered account address and we will help you reset your password manually.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:service.natomal@gmail.com"
            className="inline-flex items-center rounded-sm bg-(--color-primary) px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#1a1611] uppercase transition hover:opacity-90"
          >
            Contact Support
          </a>
          <Link href="/login" className="text-sm font-semibold text-(--color-primary) hover:underline">
            Back to Login
          </Link>
        </div>
      </CardShell>
    </div>
  );
}
