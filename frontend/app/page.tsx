import Hero from '../components/hero'
import Features from '../components/features'
import Pricing from '../components/pricing'

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Hero />
      <Features />
      <Pricing />
    </main>
  )
}