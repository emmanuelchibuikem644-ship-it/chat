"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, RotateCcw, LogOut } from "lucide-react";
import Link from "next/link";
import MessageList from "@/Compunent/chat/MessageList";
import ChatInput from "@/Compunent/chat/ChatInput";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://chatbox-2-xhh8.onrender.com";

// Generate or retrieve a session ID for this browser session
function getSessionId() {
  if (typeof window === "undefined") {
    return "";
  }

  let sid = sessionStorage.getItem("solace_session");

  if (!sid) {
    sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("solace_session", sid);
  }

  return sid;
}

export default function ChatPage() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const bottomRef = useRef(null);

  // FIXED PART
  const sessionId = useRef("");

  useEffect(() => {
    sessionId.current = getSessionId();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("access")) {
      router.replace("/chat");
      return;
    }

    const name = localStorage.getItem("username") || "";
    setUserName(name.split("@")[0]);

    // Increment conversation count
    const count = parseInt(localStorage.getItem("conv_count") || "0");

    localStorage.setItem("conv_count", String(count + 1));
  }, [router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text) => {
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId.current,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: data.response || "I'm here. Could you tell me more?",
          emotion: data.emotion || "neutral",
          intent: data.intent,
          time: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "I'm having a little trouble connecting right now. Please try again in a moment. 💙",
          time: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    // Reset conversation on backend too
    try {
      await fetch(`${API_BASE}/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId.current,
        }),
      });
    } catch {
      /* silent */
    }

    // New session ID
    const newSid = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    sessionStorage.setItem("solace_session", newSid);

    sessionId.current = newSid;

    setMessages([]);
  };

  const handleLogout = () => {
    ["access", "refresh", "username", "email"].forEach((k) =>
      localStorage.removeItem(k)
    );

    router.push("/");
  };

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ── Chat header ─────────────────────── */}
      <div
        style={{
          padding: "0 16px",
          height: "58px",
          borderBottom: "1px solid var(--border)",
          background: "rgba(250,248,244,0.92)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        {/* Left: logo + status */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "var(--text)",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: "var(--sage)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Heart size={15} color="white" fill="white" />

              <span
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#6bc78a",
                  border: "2px solid var(--bg)",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Solace
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                }}
              >
                Always here for you
              </div>
            </div>
          </Link>
        </div>

        {/* Right: reset + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            onClick={handleReset}
            title="Clear conversation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 12px",
              borderRadius: "9px",
              border: "1px solid var(--border)",
              background: "transparent",
              cursor: "pointer",
              fontSize: "12px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--sage-pale)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <RotateCcw size={12} /> New chat
          </button>

          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 12px",
              borderRadius: "9px",
              border: "1px solid var(--border)",
              background: "transparent",
              cursor: "pointer",
              fontSize: "12px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff0f0";
              e.currentTarget.style.color = "#dc2626";
              e.currentTarget.style.borderColor = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </div>

      {/* ── Messages ────────────────────────── */}
      <MessageList messages={messages} bottomRef={bottomRef} />

      {/* ── Typing indicator ────────────────── */}
      {loading && (
        <div
          style={{
            padding: "0 16px 12px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              padding: "10px 16px",
              borderRadius: "4px 18px 18px 18px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      )}

      {/* ── Input ───────────────────────────── */}
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}