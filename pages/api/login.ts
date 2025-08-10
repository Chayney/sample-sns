// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../prisma/generated/prisma-client"; // ← 生成済みのPrisma Client
import { serialize } from "cookie";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "認証に失敗しました" });
        }

        // セッション的なcookieを発行（簡易な例）
        const cookie = serialize("userEmail", email, {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1日
        });

        res.setHeader("Set-Cookie", cookie);
        return res.status(200).json({ message: "ログイン成功" });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "サーバーエラー" });
    }
}
