import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    const bucket = "deutschmeister-pro.appspot.com";
    const storagePath = `flashcard_assets/test.jpg`;
    const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?name=${encodeURIComponent(storagePath)}`;
    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'image/jpeg' },
      body: Buffer.from("test")
    });
    console.log("Upload status:", res.status, await res.text());
  } catch (e) {
    console.error("Error:", e.message);
  }
}
test();
