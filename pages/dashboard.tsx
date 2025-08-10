import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Post = {
    id: string;
    image: string;
};

type User = {
    id: string;
    name: string;
    image?: string;
    description?: string;
    posts: Post[];
};

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/dashboard");
            if (!res.ok) {
                console.error("Failed to fetch user data");
                return;
            }
            const data = await res.json();
            console.log("Fetched user data:", data);
            setUser(data);
        };

        fetchData();
    }, []);

    if (!user) {
        return <div>読み込み中...</div>;
    }

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mt-8 flex bg-white p-4">
                {user.image ? (
                    <Image
                        className="block aspect-[1/1] size-24 rounded-full object-cover"
                        src={user.image}
                        width={96}
                        height={96}
                        alt="user icon"
                    />
                ) : (
                    <div className="size-24 bg-gray-200 rounded-full animate-pulse" />
                )}
                <div className="pl-4">
                    <p className="text-lg font-semibold text-black">{user.name}</p>
                    {user.description ? (
                        <p className="whitespace-pre-wrap font-medium">
                            {user.description}
                        </p>
                    ) : (
                        <p className="whitespace-pre-wrap text-sm opacity-20">
                            🐾🐾🐾 「プロフィールを編集」から
                            <br />
                            自己紹介を入力しましょう 🐾🐾🐾
                        </p>
                    )}
                    <div className="mt-4 flex">
                        <p className="text-sm font-semibold text-black">
                            投稿{user.posts.length}件
                        </p>
                        <Link
                            href="/profile"
                            className="ml-2 rounded border px-2 text-sm font-semibold text-black"
                        >
                            プロフィールを編集
                        </Link>
                    </div>
                </div>
            </div>
            <div className="my-8 grid grid-cols-3 gap-1 bg-white">
                {user.posts.slice(0, 3).map((post) => (
                    <Link href={`/posts/${post.id}/edit`} key={post.id}>
                        <div>
                            <Image
                                className="aspect-[1/1] w-full object-cover"
                                src={post.image}
                                alt="post"
                                width={300}
                                height={300}
                            />
                            {/* コンソールログで写真のidを照合するため。public内の写真のdog_〇の数字を変更する */}
                            {/* <p>{post.id}</p> */}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
