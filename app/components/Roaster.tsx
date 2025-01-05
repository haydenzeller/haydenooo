"use client";
import { useState } from "react";

export default function Roaster() {
  const [response, setResponse] = useState<string>(""); // Store the AI-generated response
  const [username, setUsername] = useState<string>(""); // Store the username input
  const [loading, setLoading] = useState<boolean>(false); // Loading indicator
  const [error, setError] = useState<string | null>(null); // Store errors


  // Fetch user data and process the response
  const getResponse = async () => {
    setResponse("");
    setError(null);
    setLoading(true);
    setUsername(username.toLowerCase());

    try {
      // Fetch user data
      const userRes = await fetch("/api/FetchPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!userRes.ok) {
        throw new Error(`Failed to fetch user data ${userRes.statusText}`);
      }

      const data = await userRes.json();

      // Construct the prompt
      const userPrompt = `
        Roast tips:
        - If verified, roast them for paying for the checkmark.
        - Check follower-to-following ratio and number of tweets for roast material.
        - Mention the content of recent tweets and make fun of it.

        User: ${username}
        Followers: ${data.user?.data?.followers ?? "Unknown"}
        Following: ${data.user?.data?.following ?? "Unknown"}
        Tweets: ${
          data.posts?.data?.tweets?.length
            ? JSON.stringify(data.posts.data.tweets)
            : "No posts available"
        }
      `;

      console.log("Prompt:", userPrompt);

      // Fetch roast response
      const responseRes = await fetch("/api/GrokResp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!responseRes.ok) {
        throw new Error("Failed to fetch response from Grok.");
      }

      const responseData = await responseRes.json();
      setResponse(responseData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("Error:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="border border-gray-300 p-2 rounded-md input"
      />
      <button
        onClick={getResponse}
        disabled={loading}
        className={`btn mt-5 ${loading ? "btn-disabled" : ""}`}
      >
        {loading ? <div className="loading" /> : "Roast Me!"}
      </button>
      {response && <p className="border p-5 rounded-box m-2">{response}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}
