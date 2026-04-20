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
  } catch (err) {
    console.error("Vercel Blob upload error:", err);
    return { error: "Failed to join waitlist. Please try again." };
  }
}
