import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // prisma.ts はサーバー専用

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const email = "user+1@example.com";

    const user = await prisma.user.findFirstOrThrow({
      where: { email },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch user dashboard" });
  }
}
