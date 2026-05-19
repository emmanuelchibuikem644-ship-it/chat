"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Heart, LayoutDashboard, MessageCircle, UserCircle, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Chat",      href: "/chat",      icon: MessageCircle  },
  { label: "Profile",   href: "/profile",   icon: UserCircle     },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router   = useRouter();

  // FIXED PART
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleLogout = () => {
    ["access","refresh","username","email"].forEach(k => localStorage.removeItem(k));
    router.push("/");
  };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(250,248,244,0.90)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)", height: "60px",
      display: "flex", alignItems: "center",
      fontFamily: "var(--font-body)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "var(--text)" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Heart size={14} color="white" fill="white" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400 }}>Solace</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: 500,
                textDecoration: "none", transition: "all 0.15s",
                background: active ? "var(--sage-pale)" : "transparent",
                color: active ? "var(--sage-deep)" : "var(--text-muted)",
              }}>
                <item.icon size={15} />
                <span style={{ display: isMobile ? "none" : "inline" }}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          <button onClick={handleLogout} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "7px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: 500,
            background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)",
            transition: "all 0.15s", marginLeft: "4px",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fff0f0"; e.currentTarget.style.color = "#dc2626"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}