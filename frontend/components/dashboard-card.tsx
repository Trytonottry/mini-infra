interface Props {
  title: string
  value: string
  subtitle: string
}

export default function DashboardCard({
  title,
  value,
  subtitle
}: Props) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition">

      <div className="text-zinc-500 mb-3 text-sm uppercase tracking-wide">
        {title}
      </div>

      <div className="text-4xl font-bold mb-3">
        {value}
      </div>

      <div className="text-zinc-400 text-sm">
        {subtitle}
      </div>

    </div>
  )
}