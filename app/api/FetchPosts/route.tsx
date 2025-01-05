"use server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const KEY = process.env.X_KEY;
  if (!KEY) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  try {
    const { username } = await req.json(); // Expecting { username: string } in the request body

    // Fetch user data
    const response = await fetch(
      `https://api.twitterapi.io/twitter/user/${username}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": KEY,
        },
      }
    );

    const data = await response.json();
    if (data.msg === "user not found") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get latest 10 tweets
    const tweets = await fetch(
      `https://api.twitterapi.io/twitter/user/last_tweets?userName=${username}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": KEY,
        },
      }
    );

    const posts = await tweets.json();
    console.log("Latest Tweets:", posts);

    return NextResponse.json({ user: data, posts: posts });
  } catch (error) {
    console.error("Error fetching Twitter data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Twitter data" },
      { status: 500 }
    );
  }
}
