import { connectDB } from "@/lib/mongoDB";
import Portfolio from "../models/Portfolio";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, department, description, category, image } = await req.json();
    await connectDB();
    await Portfolio.create({ name, department, description, category, image });
    return NextResponse.json({ message: "Portfolio item created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const portfolio = await Portfolio.find();
  return NextResponse.json(portfolio);
}

export async function PUT(req) {
  const id = req.nextUrl.searchParams.get("id");
  const { name, department, description, category, image } = await req.json();
  await connectDB();
  await Portfolio.findByIdAndUpdate(id, { name, department, description, category, image });
  return NextResponse.json({ message: "Portfolio item updated" }, { status: 200 });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectDB();
  await Portfolio.findByIdAndDelete(id);
  return NextResponse.json({ message: "Portfolio item deleted" }, { status: 200 });
}