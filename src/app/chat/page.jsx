"use client";

import ChatInput from "@/Compunent/chat/ChatInput";
import MessageList from "@/Compunent/chat/MessageList";
import DashboardNav from "@/Compunent/DashboardNav";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_BASE = process.env.NEXT_PUBLIC_WS_URL;

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const token = localStorage.getItem("access");

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply || "No response",
        emotion: data.emotion || "neutral",
        intent: data.intent || "",
        time: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage = {
        id: Date.now() + 2,
        sender: "bot",
        text: "Sorry, can't answer you at the moment.",
        time: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black">
      <DashboardNav />

      <MessageList messages={messages} />

      <div ref={messagesEndRef} />

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}