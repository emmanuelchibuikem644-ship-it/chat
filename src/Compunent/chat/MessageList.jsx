"use client";
import Message from "./Message";

export default function MessageList({ messages, bottomRef }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
      {messages.length === 0 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "14px", gap: "10px", paddingBottom: "60px" }}>
          <div style={{ fontSize: "32px" }}>💙</div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", color: "var(--text)" }}>This is your safe space</p>
          <p style={{ fontSize: "13px", maxWidth: "280px", textAlign: "center", lineHeight: 1.6 }}>Feel free to share whatever's on your mind. I'm here to listen.</p>
        </div>
      )}
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
