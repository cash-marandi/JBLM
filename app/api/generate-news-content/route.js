
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, subTitle } = await req.json();

    // Replace with your actual n8n webhook URL
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      return NextResponse.json({ message: "n8n webhook URL not configured" }, { status: 500 });
    }

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, subTitle }),
    });

    if (!n8nResponse.ok) {
      const errorData = await n8nResponse.json();
      return NextResponse.json({ message: `n8n webhook error: ${errorData.message || n8nResponse.statusText}` }, { status: n8nResponse.status });
    }

    const n8nData = await n8nResponse.json();
    return NextResponse.json(n8nData, { status: 200 });
  } catch (error) {
    console.error("Error in generate-news-content API:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
