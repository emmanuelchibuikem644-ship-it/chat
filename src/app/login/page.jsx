"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";

const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_URL || "https://solar-auth-1.onrender.com";

export default function Login() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access")) router.replace("/dashboard");
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!email.trim())    errs.email    = "Please enter your email";
    if (!password.trim()) errs.password = "Please enter your password";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const res  = await fetch(`${AUTH_BASE}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setErrors({ form: data.detail || "Invalid email or password" }); return; }
      localStorage.setItem("access",   data.access);
      localStorage.setItem("refresh",  data.refresh);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email",    data.user.email);
      router.push("/dashboard");
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const field = { borderRadius: "12px", border: "1px solid var(--border)", padding: "11px 14px", fontSize: "14px", width: "100%", background: "var(--bg)", color: "var(--text)", outline: "none", fontFamily: "var(--font-body)" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "var(--font-body)" }}>
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "var(--text)", marginBottom: "32px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={18} color="white" fill="white" />
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400 }}>Solace</span>
      </Link>

      <div style={{ width: "100%", maxWidth: "420px", background: "var(--surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)", padding: "36px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 400, marginBottom: "6px" }}>Welcome back</h1>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "28px" }}>We're glad you're here 💙</p>

        {errors.form && (
          <div style={{ background: "#fff0f0", border: "1px solid #fca5a5", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#dc2626", marginBottom: "20px" }}>
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "6px" }}>Email</label>
            <div style={{ position: "relative" }}>
              <Mail size={15} style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", color: "var(--stone-light)" }} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ ...field, paddingLeft: "38px" }} placeholder="you@example.com" />
            </div>
            {errors.email && <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "4px" }}>{errors.email}</p>}
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "6px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={15} style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", color: "var(--stone-light)" }} />
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} style={{ ...field, paddingLeft: "38px", paddingRight: "40px" }} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--stone-light)", padding: 0 }}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "4px" }}>{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading} style={{
            padding: "13px", borderRadius: "12px", fontSize: "14px", fontWeight: 600,
            color: "white", background: loading ? "var(--sage-light)" : "var(--sage)",
            border: "none", cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s", marginTop: "4px",
          }}>
            {loading ? "Signing in…" : "Log in"}
          </button>
        </form>
      </div>

      <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "20px" }}>
        Don't have an account?{" "}
        <Link href="/signup" style={{ color: "var(--sage-deep)", fontWeight: 500, textDecoration: "none" }}>Sign up</Link>
      </p>
    </div>
  );
}
