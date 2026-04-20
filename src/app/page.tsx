"use client";

import { useState } from "react";
import { subscribeEmail } from "./actions";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    const res = await subscribeEmail(email);
    if (res.error) {
      setStatus("error");
      setErrorMessage(res.error);
    } else {
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-black text-center selection:bg-[#ff5500] selection:text-white">
      <div className="z-10 max-w-4xl w-full flex flex-col items-center justify-center font-sans">
        
        <h1 
          className="text-7xl sm:text-8xl md:text-[10rem] font-black text-[#ff5500] leading-none mb-6 md:mb-8 uppercase tracking-tighter"
          style={{ textShadow: "0 0 60px rgba(255, 85, 0, 0.15)" }}
        >
          NOOB GAINS
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          What if bulking actually tasted good?
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3 items-center justify-center">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            className="w-full h-14 px-5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50 focus:border-[#ff5500] transition-all disabled:opacity-50 text-base"
            required
          />
          <button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className="w-full sm:w-auto h-14 px-8 bg-[#ff5500] hover:bg-[#ff6aa1] hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] text-black font-extrabold tracking-widest uppercase whitespace-nowrap rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {status === "loading" ? "Sending..." : "Notify Me"}
          </button>
        </form>

        <div className="h-8 mt-6 flex items-center justify-center">
          {status === "success" && (
            <p className="text-green-400 font-medium animate-pulse">
              You're on the list. We'll be in touch.
            </p>
          )}
          {status === "error" && (
            <p className="text-[#ff3333] font-medium">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
