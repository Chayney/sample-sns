import { useRouter } from "next/router";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const res = await fetch("/api/logout", {
            method: "POST",
        });

        if (res.ok) {
            router.push("/login"); // ログインページにリダイレクト
        } else {
            alert("ログアウト失敗");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
            ログアウト
        </button>
    );
}
