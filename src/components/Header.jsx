import { Leaf, Sprout, Timer } from 'lucide-react';

export default function Header({ stats }) {
  return (
    <header>
      <div className="relative h-72 w-full overflow-hidden">
        {/* Simple gradient hero without 3D scene */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400" />
        {/* Subtle pattern overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,.7) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Foreground content */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl w-full px-4 pb-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/15 grid place-items-center ring-1 ring-white/25">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-white drop-shadow">PockeTree</h1>
                <p className="text-xs text-emerald-50/90 drop-shadow">Focus to grow your virtual garden</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-sm">
              <Stat icon={Timer} label="Focused" value={`${stats.totalMinutes}m`} />
              <Stat icon={Leaf} label="Trees" value={stats.completedCount} />
              <Stat icon={Sprout} label="Withered" value={stats.witheredCount} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 backdrop-blur ring-1 ring-white/25">
      <Icon className="h-4 w-4 text-white" />
      <div>
        <div className="text-white font-medium leading-tight">{value}</div>
        <div className="text-emerald-50/90 text-[11px] leading-tight">{label}</div>
      </div>
    </div>
  );
}
