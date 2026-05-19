"use client";

const EMOTION_BADGE = {
  joy:     { bg: "#e8f5e9", color: "#2e7d32", label: "😊 joy"     },
  sadness: { bg: "#e3f0fb", color: "#1565c0", label: "💙 sadness"  },
  anxiety: { bg: "#fff3e0", color: "#e65100", label: "😟 anxiety"  },
  anger:   { bg: "#fce4e4", color: "#c62828", label: "😤 anger"    },
  neutral: { bg: "#f3f3f3", color: "#555555", label: "😐 neutral"  },
  crisis:  { bg: "#fce4e4", color: "#b71c1c", label: "🆘 crisis"   },
};

export default function Message({ msg }) {
  const isBot  = msg.sender === "bot";
  const badge  = msg.emotion ? EMOTION_BADGE[msg.emotion] || EMOTION_BADGE.neutral : null;
  const timeStr = msg.time ? new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className={isBot ? "msg-in" : "msg-out"} style={{ display: "flex", justifyContent: isBot ? "flex-start" : "flex-end", marginBottom: "4px" }}>
      <div style={{ maxWidth: "78%" }}>
        {/* Bubble */}
        <div style={{
          padding: "11px 15px",
          borderRadius: isBot ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
          background: isBot ? "var(--surface)" : "var(--sage)",
          color: isBot ? "var(--text)" : "white",
          border: isBot ? "1px solid var(--border)" : "none",
          fontSize: "14px", lineHeight: 1.6,
          boxShadow: "var(--shadow-sm)",
          whiteSpace: "pre-wrap", wordBreak: "break-word",
        }}>
          {msg.text}
        </div>

        {/* Meta row: emotion badge + timestamp */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "5px", justifyContent: isBot ? "flex-start" : "flex-end", flexWrap: "wrap", paddingLeft: isBot ? "4px" : 0, paddingRight: isBot ? 0 : "4px" }}>
          {isBot && badge && (
            <span style={{
              fontSize: "11px", padding: "2px 9px", borderRadius: "99px", fontWeight: 500,
              background: badge.bg, color: badge.color,
            }}>
              {badge.label}
            </span>
          )}
          <span style={{ fontSize: "11px", color: "var(--stone-light)" }}>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}
