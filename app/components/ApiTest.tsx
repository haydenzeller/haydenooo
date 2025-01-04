"use client";
import { useState } from "react";
export default function ApiTest() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const getResponse = async () => {
    const ENDPOINT = process.env.XAI_ENDPOINT;
    console.log(ENDPOINT);
    const KEY = process.env.XAI_KEY;
    if (!ENDPOINT) {
      console.error("ENDPOINT is not defined");
      return;
    }
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "grok-2-latest",
      }),
    });
    const data = await response.json();
    setResponse(data);
  };

  return (
    <div>
      <input
        type="text"
        className="border-2 border-black"
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={getResponse}>Submit</button>
      <div>{response}</div>
    </div>
  );
}
