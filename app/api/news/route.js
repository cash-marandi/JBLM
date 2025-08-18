
import { connectDB } from "@/lib/mongoDB";
import News from "../models/News";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, subTitle, post, author, date, image } = await req.json();
    await connectDB();
    await News.create({ title, subTitle, post, author, date, image });
    return NextResponse.json({ message: "News created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const news = await News.find();
  return NextResponse.json(news);
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectDB();
  await News.findByIdAndDelete(id);
  return NextResponse.json({ message: "News deleted" }, { status: 200 });
}
