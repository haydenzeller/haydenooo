"use client";
import { useState } from "react";

export default function Roaster() {
  const [response, setResponse] = useState<string>(""); // Store the AI-generated response
  const [username, setUsername] = useState<string>(""); // Store the username input
  const [loading, setLoading] = useState<boolean>(false); // Loading indicator
  const [error, setError] = useState<string | null>(null); // Store errors
  const [age, setAge] = useState<number | null>(0); // Store the estimated age
  const [aura, setAura] = useState<number | null>(0); // Store the
 const [brainRot, setBrainRot] = useState<number | null>(0); // Store the brain rot level

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
        Respond in properly formatted JSON, do not include \`\`\`json just a JSON object {} with the following keys with no quotes:
        Roast: The roast of the user.
        EstimatedAge: The estimated age of the user.
        AuraLevel: The aura level of the user (0-100).
        BrainRot: The brain rot level of the user (0-100).


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
      console.log(responseData);
      const roast = responseData ? responseData.Roast : undefined;
      const estimatedAge = responseData ? responseData.EstimatedAge : undefined;
      const auraLevel = responseData ? responseData.AuraLevel : undefined;
      const brainRotLevel = responseData ? responseData.BrainRot : undefined;
      setResponse(roast);
      setAge(estimatedAge);
      setAura(auraLevel);
      setBrainRot(brainRotLevel);
      
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
        className="border border-red-500 p-2 rounded-md input"
      />
      <button
        onClick={getResponse}
        disabled={loading}
        className={`btn text-white mt-5 bg-red-500 ${loading ? "btn-disabled" : ""}`}
      >
        Roast Me!
      </button>
      {/* {response && <p className="border p-5 rounded-box m-2">{response}</p>} */}
      {/* animate the response as typewriter split is not a function*/}
      {/* animate */}
      <div className="flex flex-col items-center justify-center w-full h-auto p-5 rounded-box m-2">
        {loading && <progress className="progress w-56"></progress>}
        {response && (
          <div className="gap-4">
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-xl font-bold">Aura</p>
                <p className="text-xl">{aura}</p>
              </div>
              <progress
                className="progress progress-error w-full"
                value={aura ?? 0}
                max="100"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-xl font-bold">Estimated Age</p>
                <p className="text-xl">{age}</p>
              </div>
              <progress
                className="progress progress-error w-full"
                value={age ?? 0}
                max="100"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-xl font-bold">Brain Rot Level</p>
                <p className="text-xl">{brainRot}</p>
              </div>
              <progress
                className="progress progress-error w-full"
                value={brainRot ?? 0}
                max="100"
              />
            </div>
            <p className="mt-5">{response}</p>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}
