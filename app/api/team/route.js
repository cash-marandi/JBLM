import { connectDB } from "@/lib/mongoDB";
import Team from "../models/Team";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, qualification, post, position, category, image } = await req.json();
    await connectDB();
    await Team.create({ name, qualification, post, position, category, image });
    return NextResponse.json({ message: "Team member created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const team = await Team.find();
  return NextResponse.json(team);
}

export async function PUT(req) {
  const id = req.nextUrl.searchParams.get("id");
  const { name, qualification, post, position, category, image } = await req.json();
  await connectDB();
  await Team.findByIdAndUpdate(id, { name, qualification, post, position, category, image });
  return NextResponse.json({ message: "Team member updated" }, { status: 200 });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectDB();
  await Team.findByIdAndDelete(id);
  return NextResponse.json({ message: "Team member deleted" }, { status: 200 });
}