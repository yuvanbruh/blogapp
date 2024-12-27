import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise;
    const db= client.db("imean")
    const collection= db.collection("itsscary")

    await collection.updateOne(
        { email: body.email },
        { $set: { username: body.username, password: body.password } }
    )
    return NextResponse.json({ message: "User updated", ok: true });
}
