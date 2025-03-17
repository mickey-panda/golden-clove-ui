"use client";

import Navbar from "@/components/Navbar";
import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";

const FoodChat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let botResponse = "";

      // Add empty bot message first (for live updating)
      setMessages((prev) => [...prev, { role: "bot", content: "" }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        const parts = chunk.split("\n").filter(Boolean);
        for (const part of parts) {
          try {
            const json = JSON.parse(part);
            if (json.response) {
              botResponse += json.response;

              // Update last bot message
              setMessages((prev) => {
                const updatedMessages = [...prev];
                const lastIndex = updatedMessages.length - 1;
                if (updatedMessages[lastIndex].role === "bot") {
                  updatedMessages[lastIndex].content = botResponse;
                }
                return updatedMessages;
              });
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-hidden">
      <Navbar />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col items-center pt-16 w-full">
        {messages.map((msg, index) => (
          <div key={index} className="w-full flex justify-center">
            <div
              className={`p-3 my-2 max-w-screen-md w-full text-lg rounded-lg shadow-md ${
                msg.role === "user"
                  ? "bg-black text-yellow-500 text-left"
                  : "bg-yellow-500 text-gray-800 text-left"
              }`}
              style={{ whiteSpace: "pre-line" }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-center p-2">
            <FaSpinner className="animate-spin text-gray-500 text-xl" />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="flex p-4 border-t bg-white w-full">
        <input
          type="text"
          className="flex-1 p-3 border text-black rounded-lg focus:outline-none text-lg"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="ml-2 px-6 py-3 bg-black text-yellow-500 rounded-lg flex items-center text-lg"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
        </button>
      </div>
    </div>
  );
};

export default FoodChat;
