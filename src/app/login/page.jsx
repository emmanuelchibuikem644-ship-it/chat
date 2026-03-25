"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Mail, Lock } from "lucide-react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ YOUR AUTH BACKEND
  const API_BASE = "https://solar-auth-1.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email.trim()) newErrors.email = "Please enter your email";
    if (!password.trim()) newErrors.password = "Please enter your password";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({
          form: data.detail || "Invalid email or password",
        });
        return;
      }

      // ✅ SAVE TOKENS
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);

      router.push("/dashboard");
    } catch (error) {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-white text-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Heart className="h-7 w-7 text-black" />
            <span className="font-bold text-2xl">Solace</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p>We're glad you're here 💜</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border p-8">
          {errors.form && (
            <p className="text-red-500 mb-4">{errors.form}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded-xl"
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-xl"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          Don't have an account{" "}
          <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}