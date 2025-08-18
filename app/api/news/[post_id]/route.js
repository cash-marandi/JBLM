import { connectDB } from "@/lib/mongoDB";
import News from "../../models/News";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const { post_id } = params;
    const { title, subTitle, post, author, date, image } = await req.json();
    await connectDB();
    await News.findByIdAndUpdate(post_id, { title, subTitle, post, author, date, image });
    return NextResponse.json({ message: "News updated" }, { status: 200 });
}

export async function GET(req, { params }) {
    const { post_id } = params;
    await connectDB();
    const news = await News.findOne({ _id: post_id });
    return NextResponse.json(news, { status: 200 });
}