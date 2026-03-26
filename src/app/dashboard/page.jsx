"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  UserCircle,
  Smile,
  TrendingUp,
  Calendar,
  Sparkles,
} from "lucide-react";
import DashboardNav from "@/Compunent/DashboardNav";

export default function Dashboard() {
  const [data, setData] = useState({
    moodCheckins: 0,
    conversations: 0,
    wellnessScore: 0,
    userName: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const API_BASE = "https://solace-2.onrender.com";

        const res = await fetch(`${API_BASE}/api/dashboard/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch dashboard data");

        const json = await res.json();

        const username =
          json.name || localStorage.getItem("username") || "User";

        setData({
          moodCheckins: json.moodCheckins ?? 0,
          conversations: json.conversations ?? 0,
          wellnessScore: json.wellnessScore ?? 0,
          userName: username,
        });
      } catch (err) {
        setError("Unable to load dashboard. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ✅ convert score → text like your UI
  const getWellnessText = (score) => {
    if (score >= 7) return "Good";
    if (score >= 4) return "Okay";
    if (score > 0) return "Low";
    return "0";
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-black">
      <DashboardNav />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome Banner */}
        <div className="rounded-2xl p-6 mb-8 bg-gradient-to-r from-[#F3D6E4] via-[#DDE7F5] to-[#E6ECF7]">
          <h1 className="text-xl font-semibold mb-1">
            Welcome back! 🌸
          </h1>
          <p className="text-sm text-black/60">
            How are you feeling today? Remember, every step forward matters.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {/* Mood */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Smile className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-sm text-gray-500">Mood Check-ins</p>
            <p className="text-xl font-semibold mt-1">
              {data.moodCheckins}
            </p>
          </div>

          {/* Conversations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5 text-pink-500" />
            </div>
            <p className="text-sm text-gray-500">Conversations</p>
            <p className="text-xl font-semibold mt-1">
              {data.conversations}
            </p>
          </div>

          {/* Wellness */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm text-gray-500">Wellness Score</p>
            <p className="text-xl font-semibold mt-1">
              {getWellnessText(data.wellnessScore)}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="grid sm:grid-cols-3 gap-6">
          <Link
            href="/chat"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="font-medium mb-1">Start a Chat</h3>
            <p className="text-sm text-gray-500">
              Talk to your AI companion about anything
            </p>
          </Link>

           <Link
            href="/profile"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mb-4">
              <UserCircle className="w-5 h-5 text-pink-500" />
            </div>
            <h3 className="font-medium mb-1">View Profile</h3>
            <p className="text-sm text-gray-500">
              Check your settings and preferences
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-medium mb-1">Mood History</h3>
            <p className="text-sm text-gray-500">
              See how you've been feeling over time
            </p>
          </Link>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center text-gray-500 text-sm italic flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          You're doing great. One day at a time.
        </div>
      </main>
    </div>
  );
}