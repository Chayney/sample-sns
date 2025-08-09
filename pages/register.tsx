import RegisterForm from "../components/registerForm";

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <h1>ユーザー登録</h1>
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                <RegisterForm />
            </div>
        </div>
    );
}