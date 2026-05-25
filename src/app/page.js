"use client";
import Link from "next/link";
import { Heart, Shield, MessageCircle, Sparkles, Lock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div style={{ fontFamily: "var(--font-body)", background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>

      {/* ── Nav ─────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(250,248,244,0.85)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)", height: "64px",
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "var(--text)" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={16} color="white" fill="white" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400 }}>Solace</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/chat" style={{ padding: "8px 18px", borderRadius: "99px", fontSize: "14px", fontWeight: 500, color: "white", textDecoration: "none", background: "var(--sage)" }}>
              start a session
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────── */}
      <section style={{ paddingTop: "120px", paddingBottom: "80px", padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>

          {/* Badge */}
          <div className="animate-fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "var(--sage-pale)", color: "var(--sage-deep)",
            padding: "6px 16px", borderRadius: "99px", fontSize: "13px", fontWeight: 500,
            marginBottom: "32px", border: "1px solid var(--sage-light)",
          }}>
            <Sparkles size={13} />
            A safe space for your mental wellness
          </div>

          <h1 className="animate-fade-up delay-100" style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 400, lineHeight: 1.15, marginBottom: "24px",
            opacity: 0,
          }}>
            You deserve to feel<br />
            <em style={{ color: "var(--sage-deep)" }}>heard & supported</em>
          </h1>

          <p className="animate-fade-up delay-200" style={{
            fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.7,
            maxWidth: "520px", margin: "0 auto 40px", opacity: 0,
          }}>
            Solace is a warm, judgment-free AI companion that listens, understands your emotions, and walks with you through difficult moments.
          </p>

          <div className="animate-fade-up delay-300" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", opacity: 0 }}>
            <Link href="/chat" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px", borderRadius: "99px", fontSize: "15px", fontWeight: 500,
              color: "white", textDecoration: "none", background: "var(--sage)",
              boxShadow: "0 4px 16px rgba(122,158,138,0.4)",
            }}>
              Start a session <ArrowRight size={16} />
            </Link>
           
          </div>
        </div>

        {/* Floating chat preview */}
        <div className="animate-fade-up delay-400" style={{
          maxWidth: "520px", margin: "60px auto 0",
          background: "var(--surface)", borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)",
          overflow: "hidden", opacity: 0,
        }}>
          {/* Chat header */}
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--sage-pale)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={16} color="var(--sage-deep)" fill="var(--sage-light)" />
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600 }}>Solace</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6bc78a", display: "inline-block" }} />
                Always here for you
              </div>
            </div>
          </div>
          {/* Sample messages */}
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { from: "bot", text: "Hi there 💙 How are you feeling today?" },
              { from: "user", text: "I've been feeling really anxious lately and can't sleep well." },
              { from: "bot", text: "I'm really sorry to hear that. Anxiety can feel so exhausting, especially when it affects your sleep. Would you like to talk about what's been on your mind?" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "78%", padding: "10px 14px", borderRadius: m.from === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                  background: m.from === "user" ? "var(--sage)" : "var(--sage-pale)",
                  color: m.from === "user" ? "white" : "var(--text)",
                  fontSize: "13px", lineHeight: 1.5,
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,4vw,46px)", fontWeight: 400, marginBottom: "12px" }}>Built for your comfort</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>Every detail is designed to make you feel safe and understood.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {[
              { icon: Shield, title: "Safe & Private", desc: "Your conversations are private and protected. Nothing is ever shared." },
              { icon: MessageCircle, title: "Emotion-Aware AI", desc: "Solace detects how you're feeling and tailors every response with care." },
              { icon: Sparkles, title: "Personalized Support", desc: "Adapts to your mood, preferences, and the time of day you reach out." },
              { icon: Lock, title: "No Judgment, Ever", desc: "A space where you can be completely honest without fear of criticism." },
            ].map((f) => (
              <div key={f.title} style={{
                padding: "28px", borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)", background: "var(--bg)",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--sage-pale)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <f.icon size={20} color="var(--sage-deep)" />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, marginBottom: "16px" }}>
            Ready to feel heard?
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "16px", marginBottom: "32px" }}>
            Join Solace today and take the first step on your wellness journey.
          </p>
          <Link href="/chat" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "14px 32px", borderRadius: "99px", fontSize: "15px", fontWeight: 500,
            color: "white", textDecoration: "none", background: "var(--sage)",
            boxShadow: "0 4px 16px rgba(122,158,138,0.4)",
          }}>
            Get started free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 24px", background: "var(--surface)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "14px" }}>
            <Heart size={14} color="var(--sage)" fill="var(--sage)" />
            <span style={{ fontFamily: "var(--font-display)" }}>Solace</span>
            <span>· © 2026</span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            This is a supportive tool, not a substitute for professional mental health care.
          </p>
        </div>
      </footer>
    </div>
  );
}

