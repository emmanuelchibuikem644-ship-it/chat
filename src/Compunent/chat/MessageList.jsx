"use client";

export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id || Math.random()}
          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`px-4 py-2 rounded max-w-xs break-words ${
              msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {msg.text}
            {msg.emotion && (
              <div className="text-xs text-gray-500 mt-1">
                Emotion: {msg.emotion}
              </div>
            )}
            <div className="text-[10px] text-gray-400 mt-1 text-right">
              {msg.time ? new Date(msg.time).toLocaleTimeString() : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}