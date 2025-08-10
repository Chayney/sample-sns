// pages/api/logout.ts
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Set-Cookie", serialize("auth", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0), // 過去に設定して削除
    }));

    res.status(200).json({ message: "ログアウト成功" });
}
