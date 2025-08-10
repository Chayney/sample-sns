import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            const data = await res.json();
            setError(data.message || "ログインに失敗しました");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    メールアドレス
                </label>
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                    required
                />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                    パスワード
                </label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                    required
                />
            </div>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            <div className="mt-8 flex items-center justify-end">
                <Link
                    className="rounded-md text-sm text-gray-600 underline"
                    href="/register"
                >
                    新規会員登録はこちら
                </Link>

                <button
                    type="submit"
                    className="ml-4 inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-white"
                >
                    ログイン
                </button>
            </div>
        </form>
    );
}
