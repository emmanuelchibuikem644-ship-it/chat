"use client";
import { useState } from "react";
import Message from "./Message";

export default function ChatBox() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);

  const API_BASE = process.env.NEXT_PUBLIC_WS_URL;

  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;

    const token = localStorage.getItem("access");

    const userMsg = { text, from: "user" };
    setHistory((prev) => [...prev, userMsg]);
    setText("");

    try {
      const res = await fetch(`${API_BASE}/api/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ AUTH
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      if (!res.ok) throw new Error("Failed request");

      const data = await res.json();

      const botMsg = {
        text: `(${data.emotion || "neutral"}${
          data.intent ? ", " + data.intent : ""
        }) — ${data.reply}`,
        from: "bot",
      };

      setHistory((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);

      setHistory((prev) => [
         ...prev,
        { text: "Error talking to AI.", from: "bot" },
      ]);
    }
  }

  return (
    <div className="flex flex-col space-y-3 h-[500px] overflow-auto p-4 border rounded-lg bg-white shadow-md">
      {history.map((m, i) => (
        <Message key={i} text={m.text} from={m.from} />
      ))}

      <form onSubmit={handleSend} className="flex mt-2">
        <input
          className="flex-1 border p-2 rounded-l focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type how you feel..."
        />
        <button className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
}