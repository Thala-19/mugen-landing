import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "signups-test.json");

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Read existing signups
    let signups: string[] = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      signups = JSON.parse(raw);
    }

    // If already signed up, return their position
    let position = signups.indexOf(email);
    if (position === -1) {
      signups.push(email);
      fs.writeFileSync(filePath, JSON.stringify(signups, null, 2));
      position = signups.length - 1;
    }

    return NextResponse.json({ success: true, position: position + 1 }); // human-friendly index
  } catch (err) {
    console.error("Error saving signup:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
