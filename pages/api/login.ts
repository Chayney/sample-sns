// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { PrismaClient } from "../../prisma/generated/prisma-client";

export const config = {
    runtime: "nodejs", // これにより Edge Function ではなく Node.js で動作します
};

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "認証に失敗しました" });
        }

        const cookie = serialize("userEmail", email, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // 本番環境でのみ Secure 属性を付与
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1日
        });

        console.log("Login API: Set-Cookie header:", cookie);
        res.setHeader("Set-Cookie", cookie);
        return res.status(200).json({ message: "ログイン成功" });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "サーバーエラー" });
    }
}
