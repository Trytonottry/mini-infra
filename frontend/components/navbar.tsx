import Link from "next/link"

export default function Navbar() {
  return (
    <header className="border-b border-zinc-900 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="font-bold text-lg">
          Infra Platform
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">

          <Link className="hover:text-white" href="/">
            Home
          </Link>

          <Link className="hover:text-white" href="/vpn">
            VPN
          </Link>

          <Link className="hover:text-white" href="/analyzer">
            Analyzer
          </Link>

          <Link className="hover:text-white" href="/dashboard">
            Dashboard
          </Link>

          <Link className="hover:text-white" href="/pricing">
            Pricing
          </Link>

        </nav>

      </div>
    </header>
  )
}
