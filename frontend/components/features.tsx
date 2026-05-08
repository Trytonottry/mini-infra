export default function Features() {
  return (
    <section className="py-24 px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Platform Features
          </h2>

          <p className="text-zinc-400 text-lg">
            Everything you need to manage infrastructure and VPN services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              VPN Infrastructure
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              VLESS + Reality через 3X-UI. Управление пользователями,
              лимиты, подписки и автоматическая генерация access links.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              AI Log Analyzer
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Анализ логов Linux, Docker и Proxmox. Быстрое выявление
              ошибок, деградаций дисков и OOM событий.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Monitoring Layer
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Система мониторинга инфраструктуры с уведомлениями
              в Telegram и базовой аналитикой нагрузки.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}