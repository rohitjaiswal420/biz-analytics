

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

 export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const imageName = searchParams.get("imageName");

    if (!imageName) {
        return NextResponse.json({ error: "Image name is required" }, { status: 400 });
    }

    const imagePath = path.join(process.cwd(), "uploads", imageName);

    if (!fs.existsSync(imagePath)) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Fully read the image before sending (fixes progressive load)
    const imageBuffer = fs.readFileSync(imagePath);

    return new Response(imageBuffer, {
        headers: {
            "Content-Type": getContentType(imageName),
            "Content-Length": imageBuffer.length, // Ensure correct loading behavior
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}

function getContentType(fileName) {
    const mimeTypes = { ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
    return mimeTypes[path.extname(fileName).toLowerCase()] || "application/octet-stream";
}



