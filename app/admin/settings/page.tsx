"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import ImageUpload from "@/components/admin/image-upload"

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        site_name: "",
        contact_email: "",
        logo_url: "",
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        const { data } = await supabase.from("site_settings").select("*").single()
        if (data) {
            setSettings(data)
        }
        setLoading(false)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        // Upsert logic (if ID 1 exists update it, otherwise insert)
        // Assuming single row for simplicity with ID=1 or we just update the first row found
        const { error } = await supabase.from("site_settings").upsert({
            id: 1, // Enforce singleton
            ...settings,
            // Preserve other fields not in this form if needed, but here we cover name/email/logo
            // whatsapp_number is handled elsewhere so we should be careful not to overwrite it with null if we didn't fetch it? 
            // Actually upsert overwrites. We should fetch everything first.
        })

        if (error) {
            toast.error("Failed to save settings")
        } else {
            toast.success("Settings saved")
        }
        setSaving(false)
    }

    // NOTE: We need to make sure we don't wipe 'whatsapp_number' if we didn't include it here.
    // The fetch gets "select *", so 'settings' state has it (if we type it properly).
    // Let's ensure state includes it even if hidden from form.

    if (loading) return <div>Loading...</div>

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">General Settings</h1>

            <form onSubmit={handleSave} className="space-y-8">
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Branding</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Site Logo</label>
                            <ImageUpload
                                value={settings.logo_url || ""}
                                onChange={(url) => setSettings(prev => ({ ...prev, logo_url: url }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Site Name</label>
                            <input
                                type="text"
                                required
                                value={settings.site_name}
                                onChange={(e) => setSettings(prev => ({ ...prev, site_name: e.target.value }))}
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Contact Email</label>
                        <input
                            type="email"
                            required
                            value={settings.contact_email}
                            onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
                            className="w-full px-4 py-2 rounded-lg bg-background border border-border"
                        />
                        <p className="text-xs text-muted-foreground">Used for the contact form recipient.</p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="button-primary flex items-center gap-2"
                >
                    {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                    Save Changes
                </button>
            </form>
        </div>
    )
}
