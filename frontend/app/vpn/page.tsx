export default function VPNPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          VPN Management
        </h1>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <div className="mb-6">
            <div className="text-zinc-500 mb-2">
              Connection Status
            </div>

            <div className="text-green-400 text-3xl font-bold">
              CONNECTED
            </div>
          </div>

          <div className="mb-6">
            <div className="text-zinc-500 mb-2">
              Subscription URL
            </div>

            <div className="bg-black border border-zinc-800 rounded-xl p-4 overflow-auto text-sm">
              https://vpn.example.com/sub/abc123
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold">
              Copy URL
            </button>

            <button className="border border-zinc-700 px-6 py-3 rounded-xl">
              Show QR
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}