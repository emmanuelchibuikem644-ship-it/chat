"use client";
import { useState, useRef } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const taRef = useRef(null);

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
    if (taRef.current) { taRef.current.style.height = "auto"; }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    const ta = taRef.current;
    if (ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 130) + "px"; }
  };

  return (
    <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div style={{
        display: "flex", alignItems: "flex-end", gap: "10px",
        background: "var(--bg)", borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)", padding: "10px 12px",
      }}>
        <textarea
          ref={taRef}
          rows={1}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? "Solace is thinking…" : "Share what's on your mind…"}
          style={{
            flex: 1, resize: "none", border: "none", background: "transparent",
            fontSize: "14px", lineHeight: 1.6, fontFamily: "var(--font-body)",
            color: "var(--text)", outline: "none", maxHeight: "130px",
            caretColor: "var(--sage)",
          }}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          style={{
            width: "36px", height: "36px", borderRadius: "10px", border: "none",
            background: text.trim() && !disabled ? "var(--sage)" : "var(--border)",
            cursor: text.trim() && !disabled ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "background 0.2s",
          }}
        >
          <Send size={15} color={text.trim() && !disabled ? "white" : "var(--stone-light)"} />
        </button>
      </div>
      <p style={{ fontSize: "11px", color: "var(--stone-light)", textAlign: "center", marginTop: "8px" }}>
        This is a supportive tool — not a substitute for professional mental health care.
      </p>
    </div>
  );
}
