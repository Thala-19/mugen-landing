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

    // Basic email format validation
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    // More reliable regex (matches Supabase constraint)
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Regex validation failed: invalid email format" }, { status: 400 });
    }

    // Try inserting the email
    const { error } = await supabase.from("signups").insert([{ email }]);

    let duplicate = false;
    if (error) {
      if (error.message.includes("duplicate")) {
        duplicate = true;
      } else {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { error: `Supabase insert error: ${error.message}` },
          { status: 500 }
        );
      }
    }

    
    // Count rows for position
    const { count, error: countError } = await supabase.from("signups").select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Supabase count error:", countError);
      return NextResponse.json(
        { error: `Supabase count error: ${countError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      duplicate,
      position: count ?? null,
    });

  } catch (err) {
    if (err instanceof Error) {
      console.error("Unexpected server error:", err);
      return NextResponse.json(
        { error: `Unexpected server error: ${err.message}` },
        { status: 500 }
      );
    }
    console.error("Unexpected server error (non-Error):", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}