import DashboardCard from '../../components/dashboard-card'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-12">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <DashboardCard
            title="VPN Status"
            value="ACTIVE"
            subtitle="VLESS + Reality"
          />

          <DashboardCard
            title="Traffic"
            value="124 GB"
            subtitle="Current month"
          />

          <DashboardCard
            title="Subscription"
            value="24 Days"
            subtitle="Until renewal"
          />

        </div>
      </div>
    </main>
  )
}