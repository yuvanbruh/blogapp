import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("imean");
    const collection = db.collection("itsscary");

    // Update or insert a blog entry based on the email
    await collection.updateOne(
      { email: body.email }, // Filter by email
      { $set: { title: body.title, content: body.content } }, // Update fields
      { upsert: true } // Insert if no matching document is found
    );
    return NextResponse.json({ message: "Blog updated/added successfully", ok: true });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
  }
}
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("imean");
    const collection = db.collection("itsscary");

    // Fetch all blogs
    const blogs = await collection.find({}).toArray();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

