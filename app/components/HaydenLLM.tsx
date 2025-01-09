"use client";
import { useState } from "react";

export default function HaydenLLM() {
  type Chat = {
    message: string;
    user: boolean;
  };

  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);

  const send = async () => {
    setChats((prevChats) => [...prevChats, { message: prompt, user: true }]);
    setPrompt("");
    try {
      const res = await fetch("/api/GrokResp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          roast: false,
        }),
      });
      const data = await res.json();
      // set chats and include previous chats
      setChats((prevChats) => [
        ...prevChats,
        { message: data.Response, user: false },
      ]);
      console.log(chats.length);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="flex items-center justify-center flex-col">
      <div className="w-full">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`chat ${chat.user ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-header">{chat.user ? "You" : "HaydenGPT"}</div>
            <div className="chat-bubble">{chat.message}</div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your message..."
        className="input input-bordered w-full max-w-xs"
      />
      <button onClick={send} className="btn btn-primary mt-2">
        Send
      </button>
    </section>
  );
}
