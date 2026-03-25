"use client";

import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSendClick = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className="p-4 bg-white flex gap-2 border-t">
      <input
        type="text"
        className="flex-1 border rounded px-3 py-2"
        placeholder={disabled ? "Thinking..." : "Type a message..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleEnter}
        disabled={disabled}
      />

      <button
        onClick={handleSendClick}
        className={`px-4 py-2 rounded text-white ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={disabled}
      >
        send
      </button>
    </div>
  );
}
