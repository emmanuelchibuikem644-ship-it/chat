"use client";

import ChatInput from "@/Compunent/chat/ChatInput";
import MessageList from "@/Compunent/chat/MessageList";
import DashboardNav from "@/Compunent/DashboardNav";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      (
        
        {
          
          headers: {
          
          },
          
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply, // Django sends "reply"
        emotion: data.emotion,
        time: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage = {
        id: Date.now() + 2,
        sender: "bot",
        text: "Sorry, can't answer you at the momment.",
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