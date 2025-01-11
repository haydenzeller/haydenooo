"use client";
import { useState } from "react";
export default function PostAnalyzer() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const generatePost = async () => {
    // get posts
    setLoading(true);
    setUsername(username.toLowerCase());
    setResponse("");
    try {
      const userRes = await fetch("/api/FetchPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!userRes.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await userRes.json();

      const userPrompt = `
      Analyze the following data from a user on X
      based on this users posts and reposts, generate a post
      that this user will like.
      just respond with the post. no filler.

      posts: ${
        data.posts?.data?.tweets?.length
          ? JSON.stringify(data.posts.data.tweets)
          : "No posts available"
      }
      `;

      const responseRes = await fetch("/api/GrokResp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userPrompt,
          roast: false,
        }),
      });

      if (!responseRes.ok) {
        throw new Error("Failed to fetch response from Grok");
      }

      const responseData = await responseRes.json();
      console.log(responseData);
      setLoading(false);
      setResponse(responseData.Response);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
        className="border border-red-500 p-2 rounded-md input"
      />
      <button
        onClick={generatePost}
        disabled={loading}
        className={`btn text-white mt-5 bg-red-500 ${
          loading ? "btn-disabled" : ""
        }`}
      >
        {loading ? <div className="loading" /> : <div>Generate</div>}
      </button>
      <p className="flex flex-col items-center justify-center font-bold text-xl mt-5">
        {response}
      </p>
    </div>
  );
}
