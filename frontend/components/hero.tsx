export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-8">
      <div className="max-w-5xl text-center">
        <div className="mb-6 inline-block border border-green-500 rounded-full px-4 py-2 text-green-400 text-sm">
          PRIVATE INFRASTRUCTURE PLATFORM
        </div>

        <h1 className="text-7xl font-bold leading-tight mb-8">
          Infrastructure tools
          <br />
          for modern operators.
        </h1>

        <p className="text-zinc-400 text-xl mb-10 max-w-3xl mx-auto">
          WireGuard VPN, AI log analysis, Proxmox monitoring,
          Telegram-native infrastructure management.
        </p>

        <div className="flex gap-4 justify-center">
          <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold">
            Start Free Trial
          </button>

          <button className="border border-zinc-700 px-8 py-4 rounded-xl">
            Open Dashboard
          </button>
        </div>
      </div>
    </section>
  )
}