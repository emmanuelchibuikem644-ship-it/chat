"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, UserCircle, Smile, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import DashboardNav from "@/Compunent/DashboardNav";

export default function Dashboard() {
  const [userName, setUserName] = useState("there");
  const [conversations, setConversations] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("access")) { window.location.href = "/login"; return; }
    const stored = localStorage.getItem("username");
    if (stored) setUserName(stored.split("@")[0]);
    // Track local conversation count
    const count = parseInt(localStorage.getItem("conv_count") || "0");
    setConversations(count);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-body)" }}>
      <DashboardNav />

      <main style={{ maxWidth: "920px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Welcome banner */}
        <div style={{
          borderRadius: "var(--radius-lg)", padding: "28px 32px", marginBottom: "36px",
          background: "linear-gradient(135deg, var(--sage-pale) 0%, var(--blush-pale) 100%)",
          border: "1px solid var(--sage-light)",
        }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 400, marginBottom: "6px" }}>
            {greeting}, {userName} 🌸
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6 }}>
            How are you feeling today? Remember, every step forward matters — no matter how small.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: "16px", marginBottom: "36px" }}>
          {[
            { icon: MessageCircle, color: "var(--sage-pale)",  iconColor: "var(--sage-deep)",  label: "Conversations",  value: conversations },
            { icon: Smile,         color: "var(--blush-pale)", iconColor: "#c2596d",            label: "Mood check-ins",  value: "—" },
            { icon: TrendingUp,    color: "#e8f0fa",           iconColor: "#3b6db3",            label: "Wellness score",  value: "—" },
          ].map((s) => (
            <div key={s.label} style={{ background: "var(--surface)", borderRadius: "var(--radius-md)", padding: "22px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <s.icon size={18} color={s.iconColor} />
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>{s.label}</p>
              <p style={{ fontSize: "22px", fontWeight: 600 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <h2 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Quick actions
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "16px" }}>
          {[
            { href: "/chat",    icon: MessageCircle, color: "var(--sage-pale)",  iconColor: "var(--sage-deep)", title: "Start a chat",   desc: "Talk to your AI companion about anything on your mind" },
            { href: "/profile", icon: UserCircle,    color: "var(--blush-pale)", iconColor: "#c2596d",           title: "View profile",   desc: "Check your settings and personal preferences"          },
          ].map((a) => (
            <Link key={a.href} href={a.href} style={{
              display: "block", background: "var(--surface)", borderRadius: "var(--radius-md)",
              padding: "24px", border: "1px solid var(--border)", textDecoration: "none", color: "var(--text)",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: a.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <a.icon size={18} color={a.iconColor} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 600 }}>{a.title}</h3>
                <ArrowRight size={14} color="var(--stone-light)" />
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{a.desc}</p>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "48px", textAlign: "center", fontSize: "13px", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <Sparkles size={13} color="var(--sage)" />
          You're doing great. One day at a time.
        </div>
      </main>
    </div>
  );
}
