"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [position, setPosition] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to sign up");

      const data = await res.json();
      setStatus("success");
      setPosition(data.position);
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
      {status !== "success" && (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 bg-white-600 border rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Submitting..." : "Pre-Register Now!"}
          </Button>
        </>
      )}

      {status === "success" && position !== null && (
        <p className="text-lg text-green-600 font-semibold">
          🎉 Thanks for signing up! You’re <span className="font-bold">#{position}</span> on the waitlist.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 mt-2 sm:mt-0">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
