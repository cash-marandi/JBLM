
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDB';
import Contact from '@/app/api/models/Contact';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { name, email, message } = await req.json();
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    return NextResponse.json({ message: 'Contact form submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving contact form data:', error);
    return NextResponse.json({ message: 'Error saving contact form data' }, { status: 500 });
  }
}
