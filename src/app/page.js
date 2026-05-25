"use client";
import Link from "next/link";
import { Heart, Shield, MessageCircle, Sparkles, Lock, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CAROUSEL_ITEMS = [
  {
    quote: "I finally feel like someone is listening. Solace helped me get through the hardest week of my life.",
    name: "Amara T.",
    mood: "Anxiety & Sleep",
    color: "#e8f0eb",
    accent: "#7a9e8a",
  },
  {
    quote: "I was skeptical at first, but the conversations felt so real and warm. I look forward to checking in every day.",
    name: "Daniel K.",
    mood: "Loneliness",
    color: "#ede8f0",
    accent: "#9a7ab0",
  },
  {
    quote: "No judgment. No rush. Just someone asking how I'm doing — and actually meaning it.",
    name: "Priya M.",
    mood: "Burnout",
    color: "#f0ebe8",
    accent: "#b08a7a",
  },
  {
    quote: "Solace helped me identify patterns in my anxiety I never noticed before. It's like a mirror for my mind.",
    name: "Luca R.",
    mood: "Stress & Clarity",
    color: "#e8edf0",
    accent: "#7a9ab0",
  },
  {
    quote: "I appreciate how it never tries to fix me — it just helps me feel understood. That's everything.",
    name: "Zoe A.",
    mood: "Grief",
    color: "#f0ede8",
    accent: "#b0a07a",
  },
];

export default function Home() {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const posRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.6;

    const animate = () => {
      if (!isPaused) {
        posRef.current += speed;

        const half = track.scrollWidth / 2;

        if (posRef.current >= half) {
          posRef.current = 0;
        }

        track.style.transform = `translateX(-${posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

  // Duplicate items for seamless loop
  const items = [...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS];

  return (
    <div style={{ fontFamily: "var(--font-body)", background: "var(--bg)", color: "var(--text)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── Nav ─────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(250,248,244,0.85)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)", height: "64px",
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "var(--text)" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#7c5cbf", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={16} color="white" fill="white" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400 }}>Solace</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/chat" style={{
              padding: "10px 22px", borderRadius: "99px", fontSize: "14px", fontWeight: 500,
              color: "white", textDecoration: "none",
              background: "linear-gradient(135deg, #8b6fd4 0%, #6c4bb8 100%)",
              boxShadow: "0 4px 14px rgba(108,75,184,0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(108,75,184,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(108,75,184,0.35)"; }}
            >
              Start a session
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────── */}
      <section style={{ paddingTop: "120px", paddingBottom: "100px", padding: "120px 24px 100px", position: "relative", overflow: "hidden" }}>
        {/* Soft radial glow background */}
        <div style={{
          position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
          width: "700px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(139,111,212,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Floating orbs */}
        <div style={{
          position: "absolute", top: "15%", left: "8%", width: "180px", height: "180px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,111,212,0.08) 0%, transparent 70%)",
          animation: "float1 8s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "6%", width: "120px", height: "120px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(122,158,138,0.1) 0%, transparent 70%)",
          animation: "float2 10s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          {/* Badge */}
          <div className="animate-fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(139,111,212,0.08)", color: "#6c4bb8",
            padding: "6px 16px", borderRadius: "99px", fontSize: "13px", fontWeight: 500,
            marginBottom: "32px", border: "1px solid rgba(139,111,212,0.2)",
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
            <em style={{ color: "#7c5cbf" }}>heard & supported</em>
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
              color: "white", textDecoration: "none",
              background: "linear-gradient(135deg, #8b6fd4 0%, #6c4bb8 100%)",
              boxShadow: "0 6px 24px rgba(108,75,184,0.4)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(108,75,184,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(108,75,184,0.4)"; }}
            >
              Start a session <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Floating chat preview */}
        <div className="animate-fade-up delay-400" style={{
          maxWidth: "520px", margin: "60px auto 0",
          background: "var(--surface)", borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 24px 64px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.05)",
          overflow: "hidden", opacity: 0,
        }}>
          {/* Chat header */}
          <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(139,111,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={16} color="#7c5cbf" fill="rgba(124,92,191,0.2)" />
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
                  maxWidth: "78%", padding: "10px 14px",
                  borderRadius: m.from === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                  background: m.from === "user" ? "linear-gradient(135deg, #8b6fd4 0%, #6c4bb8 100%)" : "rgba(139,111,212,0.08)",
                  color: m.from === "user" ? "white" : "var(--text)",
                  fontSize: "13px", lineHeight: 1.5,
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{
                padding: "10px 16px", borderRadius: "4px 18px 18px 18px",
                background: "rgba(139,111,212,0.08)", display: "flex", gap: "4px", alignItems: "center",
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: "6px", height: "6px", borderRadius: "50%", background: "#9b7ed4",
                    display: "inline-block",
                    animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────── */}
      <section style={{ padding: "80px 24px 100px", background: "linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,4vw,46px)", fontWeight: 400, marginBottom: "12px" }}>Built for your comfort</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>Every detail is designed to make you feel safe and understood.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {[
              { icon: Shield, title: "Safe & Private", desc: "Your conversations are private and protected. Nothing is ever shared." },
              { icon: MessageCircle, title: "Emotion-Aware AI", desc: "Solace detects how you're feeling and tailors every response with care." },
              { icon: Sparkles, title: "Personalized Support", desc: "Adapts to your mood, preferences, and the time of day you reach out." },
              { icon: Lock, title: "No Judgment, Ever", desc: "A space where you can be completely honest without fear of criticism." },
            ].map((f) => (
              <div key={f.title} style={{
                padding: "28px", borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.06)", background: "var(--bg)",
                transition: "box-shadow 0.25s, transform 0.25s",
                cursor: "default",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(108,75,184,0.12)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(139,111,212,0.12) 0%, rgba(108,75,184,0.06) 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px",
                }}>
                  <f.icon size={20} color="#7c5cbf" />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Auto-scrolling Testimonials Carousel ── */}
      <section style={{ padding: "80px 0 100px", background: "var(--surface)", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, marginBottom: "12px" }}>
            What people are saying
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>Real experiences from people on their wellness journey.</p>
        </div>

        {/* Carousel track */}
        <div
          style={{ overflow: "hidden", position: "relative" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fade edges */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
            background: "linear-gradient(to right, var(--surface), transparent)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
            background: "linear-gradient(to left, var(--surface), transparent)",
            pointerEvents: "none",
          }} />

          <div ref={trackRef} style={{ display: "flex", gap: "20px", width: "max-content", padding: "8px 24px" }}>
            {items.map((item, i) => (
              <div key={i} style={{
                width: "320px", flexShrink: 0,
                padding: "28px", borderRadius: "20px",
                background: item.color,
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                display: "flex", flexDirection: "column", gap: "20px",
              }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: "3px" }}>
                  {[0,1,2,3,4].map((s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={item.accent}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#2a2a2a", fontStyle: "italic", margin: 0 }}>
                  "{item.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: item.accent, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Heart size={14} color="white" fill="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a" }}>{item.name}</div>
                    <div style={{ fontSize: "11px", color: "#666", marginTop: "1px" }}>{item.mood}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "32px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "14px" }}>
            <Heart size={14} color="#7c5cbf" fill="#7c5cbf" />
            <span style={{ fontFamily: "var(--font-display)" }}>Solace</span>
            <span>· © 2026</span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            This is a supportive tool, not a substitute for professional mental health care.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-14px) scale(1.08); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        .animate-fade-up {
          animation: fadeUp 0.7s ease forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.5s; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}