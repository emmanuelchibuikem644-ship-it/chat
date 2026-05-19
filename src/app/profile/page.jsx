"use client";
import { useState, useEffect } from "react";
import DashboardNav from "@/Compunent/DashboardNav";
import { UserCircle, Mail, Bell, Shield, Download, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail]             = useState("");
  const [prefs, setPrefs]             = useState({ dailyReminders: true, privacyMode: true, calmingAnimations: true });
  const [saved, setSaved]             = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("access")) { router.push("/login"); return; }
    const name = localStorage.getItem("username") || "";
    setDisplayName(name.split("@")[0] || name);
    setEmail(localStorage.getItem("email") || "");
  }, [router]);

  const handleSave = () => {
    localStorage.setItem("username", displayName);
    localStorage.setItem("email",    email);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify({ displayName, email, prefs }, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href = url; a.download = `solace_data.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      ["access","refresh","username","email","conv_count"].forEach(k => localStorage.removeItem(k));
      router.push("/");
    }
  };

  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: "14px", fontFamily: "var(--font-body)", outline: "none" };
  const card = { background: "var(--surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "24px", marginBottom: "20px" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-body)" }}>
      <DashboardNav />

      <main style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 400, marginBottom: "28px" }}>Your Profile</h1>

        {/* Profile card */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "var(--sage-pale)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <UserCircle size={26} color="var(--sage-deep)" />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 600 }}>{displayName || "User"}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{email}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Display name</label>
              <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} style={inputStyle} placeholder="Your name" />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={14} style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", color: "var(--stone-light)" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, paddingLeft: "36px" }} />
              </div>
            </div>
            <button onClick={handleSave} style={{
              alignSelf: "flex-start", padding: "9px 20px", borderRadius: "99px", border: "none",
              background: saved ? "#e8f5e9" : "var(--sage)", color: saved ? "#2e7d32" : "white",
              fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
              fontFamily: "var(--font-body)",
            }}>
              {saved ? "✓ Saved!" : "Save changes"}
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div style={card}>
          <h2 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "18px" }}>Preferences</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { key: "dailyReminders",    label: "Daily wellness reminders", desc: "Get gentle nudges to check in with yourself",   icon: Bell   },
              { key: "privacyMode",       label: "Enhanced privacy mode",    desc: "Extra layers of data protection",               icon: Shield },
              { key: "calmingAnimations", label: "Calming animations",       desc: "Enable soothing micro-animations in the UI",    icon: Bell   },
            ].map((p) => (
              <div key={p.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>{p.label}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{p.desc}</div>
                </div>
                <button onClick={() => setPrefs(prev => ({ ...prev, [p.key]: !prev[p.key] }))} style={{
                  width: "42px", height: "24px", borderRadius: "99px", border: "none", cursor: "pointer",
                  background: prefs[p.key] ? "var(--sage)" : "var(--border)", position: "relative", transition: "background 0.2s", flexShrink: 0,
                }}>
                  <span style={{
                    position: "absolute", top: "3px", left: prefs[p.key] ? "20px" : "3px",
                    width: "18px", height: "18px", borderRadius: "50%", background: "white",
                    transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div style={card}>
          <h2 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>Privacy & Safety</h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "18px" }}>
            Your privacy is our top priority. All conversations are private and never shared.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={handleDownload} style={{
              display: "flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "99px",
              border: "1px solid var(--border)", background: "transparent", cursor: "pointer",
              fontSize: "13px", fontWeight: 500, fontFamily: "var(--font-body)", color: "var(--text)",
            }}>
              <Download size={13} /> Download my data
            </button>
            <button onClick={handleDelete} style={{
              display: "flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "99px",
              border: "1px solid #fca5a5", background: "#fff0f0", cursor: "pointer",
              fontSize: "13px", fontWeight: 500, fontFamily: "var(--font-body)", color: "#dc2626",
            }}>
              <Trash2 size={13} /> Delete account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
