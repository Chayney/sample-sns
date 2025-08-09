export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className="text-xl text-gray-800 md:text-3xl md:leading-normal">
            <strong>愛犬との思い出写真は一生もの。</strong>
            <br />
            みんなに愛犬画像をシェアしよう。
          </p>
          <div className="flex items-center gap-5 self-start rounded-lg bg-blue-800 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600">
            <span>さっそく始める</span>
          </div>
        </div>
      </div>
    </main>
  );
}
