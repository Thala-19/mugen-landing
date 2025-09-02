import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase client with public anon key (safe to use with RLS policies)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Try inserting the email
    const { error } = await supabase
      .from("signups")
      .insert([{ email }]);

    let duplicate = false;
    if (error) {
      if (error.message.includes("duplicate")) {
        duplicate = true; // mark as duplicate
      } else {
        console.error("Insert error:", error);
        return NextResponse.json({ error: "DB error" }, { status: 500 });
      }
    }

    // Count rows for position
    const { count, error: countError } = await supabase
      .from("signups")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Count error:", countError);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      duplicate,
      position: count ?? null,
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}