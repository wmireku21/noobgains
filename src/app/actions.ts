"use server";

import { put } from "@vercel/blob";

export async function subscribeEmail(email: string) {
  if (!email || !email.includes("@")) {
    return { error: "Invalid email address." };
  }

  try {
    // Generate a secure, unguessable file URL in Vercel Blob using a suffix
    const fileName = `waitlist/${Date.now()}-${Buffer.from(email).toString('base64')}.txt`;
    
    await put(fileName, email, {
      access: "public",
      addRandomSuffix: true,
    });
    
    return { success: true };
  } catch (err: any) {
    console.error("\n=== VERCEL BLOB UPLOAD ERROR ===");
    console.error("Full Error Details:", err);
    if (err.message) {
      console.error("Exact Message:", err.message);
    }
    
    // Auto-detect the most common localhost issue
    if (err.message && err.message.includes('token')) {
      console.error("\n[!] CRITICAL HINT: You are missing your Vercel environment variables locally!");
      console.error("To fix this, run: `npx vercel link` then `npx vercel env pull .env.local` in your terminal.");
      return { error: "Missing Local Vercel Blob Token. See terminal logs for instructions." };
    }

    return { error: "Failed to join waitlist. Please try again." };
  }
}
