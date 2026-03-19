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

  // Redirect if already "logged in"
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
      // ✅ FAKE LOGIN (NO BACKEND)
      localStorage.setItem("access", "fake-token");
      localStorage.setItem("refresh", "fake-refresh");
      localStorage.setItem("username", "User");
      localStorage.setItem("email", email);

      router.push("/dashboard");
    } catch {
      setErrors({ form: "Something went wrong" });
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
            <span className="font-bold text-2xl text-black">Solace</span>
          </Link>
          <h1 className="text-2xl font-bold text-black">Welcome back</h1>
          <p className="mt-1 text-black">We're glad you're here 💜</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
          {errors.form && <p className="text-red-500 mb-4">{errors.form}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
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

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}