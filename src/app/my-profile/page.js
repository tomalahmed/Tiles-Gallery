import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import CardShell from "@/components/ui/card-shell";
import SectionTitle from "@/components/ui/section-title";
import { getServerSession } from "@/lib/server-session";
import Button from "@/components/ui/button";

export default async function MyProfilePage() {
  const sessionData = await getServerSession();
  const user = sessionData?.user ?? sessionData?.session?.user;
  // #region agent log
  await fetch("http://127.0.0.1:7322/ingest/cbbbcd65-c654-464a-b36c-50ef6abcbd17", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "ca1ca6" }, body: JSON.stringify({ sessionId: "ca1ca6", runId: "pre-fix", hypothesisId: "H2", location: "src/app/my-profile/page.js:12", message: "My profile classes before canonicalization", data: { hasUser: Boolean(user), avatarContainerClass: "border-[var(--color-border)] bg-[var(--color-bg)]", panelBorderClass: "border-[var(--color-border)]", footerBorderClass: "border-[var(--color-border)]", primaryLinkClass: "text-(--color-primary)" }, timestamp: Date.now() }) }).catch(() => {});
  await fetch("http://127.0.0.1:7322/ingest/cbbbcd65-c654-464a-b36c-50ef6abcbd17", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "ca1ca6" }, body: JSON.stringify({ sessionId: "ca1ca6", runId: "post-fix", hypothesisId: "V2", location: "src/app/my-profile/page.js:13", message: "My profile classes after canonicalization", data: { hasUser: Boolean(user), avatarContainerClass: "border-(--color-border) bg-background", panelBorderClass: "border-(--color-border)", footerBorderClass: "border-(--color-border)" }, timestamp: Date.now() }) }).catch(() => {});
  // #endregion

  if (!user) {
    redirect("/login?next=/my-profile");
  }

  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Account"
        title={`Hello, ${user.name || "Designer"}`}
        subtitle="View your profile details and keep your account information up to date."
      />
      <CardShell className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-[128px_1fr] sm:items-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-sm border border-(--color-border) bg-background">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "Profile"}
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-2xl font-semibold text-(--color-text-muted)">
                {(user.name || user.email || "U").slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="rounded-sm border border-(--color-border) px-4 py-3">
              <p className="text-[11px] tracking-[0.14em] text-(--color-text-muted) uppercase">Name</p>
              <p className="mt-1 text-base font-semibold text-foreground">{user.name || "Not set"}</p>
            </div>
            <div className="rounded-sm border border-(--color-border) px-4 py-3">
              <p className="text-[11px] tracking-[0.14em] text-(--color-text-muted) uppercase">Email</p>
              <p className="mt-1 text-base font-semibold text-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-(--color-border) pt-4">
          <Button as={Link} href="/my-profile/update" variant="subtle">
            Update Information
          </Button>
          <Link href="/all-tiles" className="text-sm font-semibold text-(--color-primary) hover:underline">
            Explore all tiles
          </Link>
        </div>
      </CardShell>
    </div>
  );
}
