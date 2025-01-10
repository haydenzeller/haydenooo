import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.prompt) {
    return NextResponse.json({ error: "prompt is required" }, { status: 400 });
  }
  const prompt = body.prompt;
  const roast = body.roast;
  const ENDPOINT = process.env.XAI_ENDPOINT;
  const KEY = process.env.XAI_KEY;
  if (!ENDPOINT) {
    return new Response("ENDPOINT is not defined");
  }
  if (!KEY) {
    return new Response("KEY is not defined");
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
  console.log(data);
  const responseJSON = data.choices[0].message.content;
  if (roast) {
    return NextResponse.json(JSON.parse(responseJSON));
  } else {
    return NextResponse.json({ Response: responseJSON });
  } 
}
