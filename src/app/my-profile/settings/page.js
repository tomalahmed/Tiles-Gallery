import { redirect } from "next/navigation";
import SectionTitle from "@/components/ui/section-title";
import AccountSettingsPanel from "@/components/profile/account-settings-panel";
import { getServerSession } from "@/lib/server-session";
import { getAccountSettings } from "@/lib/account-settings-service";

export default async function MyProfileSettingsPage({ searchParams }) {
  const sessionData = await getServerSession();
  const user = sessionData?.user ?? sessionData?.session?.user;

  if (!user) {
    redirect("/login?next=/my-profile/settings");
  }

  const params = await searchParams;
  const tab = params?.tab === "security" ? "security" : "notifications";
  const initialSettings = user.id ? await getAccountSettings(user.id) : await getAccountSettings("");

  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Account Settings"
        title="Manage Alerts & Security"
        subtitle="Update communication preferences and security options for your profile."
      />
      <AccountSettingsPanel initialSettings={initialSettings} initialTab={tab} />
    </div>
  );
}

