export default function Pricing() {
  return (
    <section className="py-24 px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Pricing Plans
          </h2>

          <p className="text-zinc-400 text-lg">
            Simple and scalable infrastructure subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* STARTER */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-4">Starter</h3>

            <div className="text-5xl font-bold mb-6">
              €5
            </div>

            <ul className="space-y-3 text-zinc-400 mb-8">
              <li>• VPN Access</li>
              <li>• 2 Devices</li>
              <li>• Basic AI Analyzer</li>
              <li>• Telegram Support</li>
            </ul>

            <button className="w-full bg-white text-black py-4 rounded-xl font-semibold">
              Get Started
            </button>
          </div>

          {/* PRO */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-4">Pro</h3>

            <div className="text-5xl font-bold mb-6">
              €15
            </div>

            <ul className="space-y-3 text-zinc-400 mb-8">
              <li>• Unlimited Devices</li>
              <li>• High-speed Nodes</li>
              <li>• AI Diagnostics</li>
              <li>• Priority Support</li>
            </ul>

            <button className="w-full bg-white text-black py-4 rounded-xl font-semibold">
              Upgrade
            </button>
          </div>

          {/* TEAM */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-4">Team</h3>

            <div className="text-5xl font-bold mb-6">
              €49
            </div>

            <ul className="space-y-3 text-zinc-400 mb-8">
              <li>• Shared Access</li>
              <li>• Admin Dashboard</li>
              <li>• API Access</li>
              <li>• SLA Support</li>
            </ul>

            <button className="w-full bg-white text-black py-4 rounded-xl font-semibold">
              Contact Sales
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}