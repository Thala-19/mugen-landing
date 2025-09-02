"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");
  const [position, setPosition] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // More reliable regex (matches Supabase constraint)
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });


      if (!res.ok) throw new Error("Failed to sign up");

      const data = await res.json();
      setPosition(data.position ?? null);

      // Differentiate between duplicate vs new
      if (data.duplicate) {
        setStatus("duplicate");
      } else {
        setStatus("success");
      }

      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-center mt-6 max-w-md mx-auto"
    >
      {status !== "success" && status !== "duplicate" && (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 border rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Submitting..." : "Pre-Register"}
          </Button>
        </>
      )}

      {status === "success" && position !== null && (
        <p className="text-lg text-green-600 font-semibold">
          🎉 Thanks for signing up! You’re{" "}
          <span className="font-bold">#{position}</span> on the waitlist.
        </p>
      )}

      {status === "duplicate" && position !== null && (
        <p className="text-lg text-blue-600 font-semibold">
          👋 Welcome back! You’re already{" "}
          <span className="font-bold">#{position}</span> on the waitlist.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 mt-2 sm:mt-0">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
