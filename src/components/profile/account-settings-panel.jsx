"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CardShell from "@/components/ui/card-shell";
import Button from "@/components/ui/button";

const TAB_IDS = ["notifications", "security"];

function sanitizeTab(tab) {
  return TAB_IDS.includes(tab) ? tab : "notifications";
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-sm border border-(--color-border) bg-background px-4 py-3">
      <span className="space-y-1">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="block text-xs text-(--color-text-muted)">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded-none border border-(--color-border) bg-transparent text-(--color-primary) focus:ring-1 focus:ring-(--color-primary)"
      />
    </label>
  );
}

export default function AccountSettingsPanel({ initialSettings, initialTab = "notifications" }) {
  const [activeTab, setActiveTab] = useState(sanitizeTab(initialTab));
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState({ error: "", success: "" });
  const [isSaving, setIsSaving] = useState(false);

  const tabs = useMemo(
    () => [
      { id: "notifications", label: "Alert Preferences" },
      { id: "security", label: "Security" },
    ],
    [],
  );

  const handleSave = async () => {
    setStatus({ error: "", success: "" });
    setIsSaving(true);

    try {
      const response = await fetch("/api/account-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const payload = await response.json();
      if (!response.ok) {
        setStatus({ error: payload?.error || "Unable to save account settings.", success: "" });
        setIsSaving(false);
        return;
      }

      setSettings(payload.settings);
      setStatus({ error: "", success: "Settings updated successfully." });
    } catch {
      setStatus({ error: "Unable to save account settings right now.", success: "" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <CardShell className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex min-h-10 items-center justify-center border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-all ${
              activeTab === tab.id
                ? "border-(--color-primary) bg-(--color-primary) text-[#1a1611]"
                : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-primary) hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "notifications" ? (
        <div className="space-y-3">
          <ToggleRow
            label="Product Launch Alerts"
            description="Get notified when new tile collections are released."
            checked={settings.productLaunchAlerts}
            onChange={(value) => setSettings((previous) => ({ ...previous, productLaunchAlerts: value }))}
          />
          <ToggleRow
            label="Sample Kit Updates"
            description="Receive updates for sample requests and stock readiness."
            checked={settings.sampleKitUpdates}
            onChange={(value) => setSettings((previous) => ({ ...previous, sampleKitUpdates: value }))}
          />
          <ToggleRow
            label="Marketing Digest"
            description="Monthly trends, campaigns, and designer editorial highlights."
            checked={settings.marketingDigest}
            onChange={(value) => setSettings((previous) => ({ ...previous, marketingDigest: value }))}
          />

          {status.error ? <p className="text-sm text-red-500">{status.error}</p> : null}
          {status.success ? <p className="text-sm text-green-600">{status.success}</p> : null}

          <Button type="button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-sm border border-(--color-border) bg-background px-4 py-3">
            <p className="text-sm font-semibold text-foreground">Password Reset</p>
            <p className="mt-1 text-xs text-(--color-text-muted)">
              Change your password securely from the recovery flow. A reset email will be issued by support flow.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button as={Link} href="/forgot-password" type="button">
              Reset Password
            </Button>
            <Button as={Link} href="/my-profile/update" variant="ghost" type="button">
              Manage Profile Details
            </Button>
          </div>
        </div>
      )}
    </CardShell>
  );
}

