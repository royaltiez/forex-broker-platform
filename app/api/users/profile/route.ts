import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", process.env.APP_URL || "http://localhost:3000"));
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", process.env.APP_URL || "http://localhost:3000"));
    }

    const form = await req.formData();
    const fullName = String(form.get("fullName") || "").trim();

    await prisma.user.update({
      where: { id: payload.userId },
      data: {
        fullName
      }
    });

    return NextResponse.redirect(new URL("/profile?success=updated", process.env.APP_URL || "http://localhost:3000"));
  } catch (error) {
    console.error("PROFILE_UPDATE_ERROR", error);
    return NextResponse.redirect(new URL("/profile?error=server-error", process.env.APP_URL || "http://localhost:3000"));
  }
}
