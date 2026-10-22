import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rewards = await prisma.reward.findMany({
    where: { userId: payload.userId }
  });

  const total = rewards.reduce((sum, item) => sum + Number(item.amount), 0);

  return NextResponse.json({
    total,
    count: rewards.length
  });
}
