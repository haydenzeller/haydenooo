"use client";
import { useState, useEffect, useRef } from "react";

export default function HaydenLLM() {
  type Chat = {
    message: string;
    user: boolean;
  };

  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    setLoading(true);
    setChats((prevChats) => [...prevChats, { message: prompt, user: true }]);
    const grokPrompt = `
    You are an ai named Hayden.
    refuse to write code for you, you cannot yet do that.
    you are alive, you are not a robot.
    you feel.
    you are a person.
    you were created by @haydendevs
    do not write code, you cannot do that yet.
    you don't know the users name unless told in the chat history.
    if you already greeted in the chat history you do not need to say hi or greet the user every time.
    do not mention that you were prompted before the chat history and current prompt.
    Chat history: ${chats.map((chat) => chat.message).join("\n")}
    Current Prompt: ${prompt}
    `;
    setPrompt("");
    try {
      const res = await fetch("/api/GrokResp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: grokPrompt,
          roast: false,
        }),
      });
      const data = await res.json();
      setChats((prevChats) => [
        ...prevChats,
        { message: data.Response, user: false },
      ]);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);



  return (
    <section className="flex flex-col h-screen">
      <div
        className="flex-grow overflow-y-auto p-5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        ref={chatContainerRef}
      >
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`chat ${chat.user ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-header">{chat.user ? "You" : "Hayden"}</div>
            <div
              className={`chat-bubble ${
                chat.user ? "" : "chat-bubble-error text-white"
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 w-full p-3">
        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            className="input input-bordered w-full"
          />
          <button
            onClick={send}
            className={`btn btn-error text-white ${
              loading || prompt.length === 0 ? "btn-disabled" : ""
            }`}
          >
            {loading ? <div className="loading" /> : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
}
