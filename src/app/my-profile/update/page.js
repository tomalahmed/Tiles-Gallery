import { redirect } from "next/navigation";
import SectionTitle from "@/components/ui/section-title";
import UpdateInfoForm from "@/components/profile/update-info-form";
import { getServerSession } from "@/lib/server-session";

export default async function UpdateProfilePage() {
  const sessionData = await getServerSession();
  const user = sessionData?.user ?? sessionData?.session?.user;

  if (!user) {
    redirect("/login?next=/my-profile/update");
  }

  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Challenge Feature"
        title="Update Profile Information"
        subtitle="Update your display name and image URL."
      />
      <UpdateInfoForm initialName={user.name || ""} initialImage={user.image || ""} />
    </div>
  );
}
