import { Leaf, Sprout, Timer } from 'lucide-react';

export default function Header({ stats }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600/10 grid place-items-center">
            <Sprout className="h-6 w-6 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">PockeTree</h1>
            <p className="text-xs text-emerald-700">Focus to grow your virtual garden</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Stat icon={Timer} label="Focused" value={`${stats.totalMinutes}m`} />
          <Stat icon={Leaf} label="Trees" value={stats.completedCount} />
          <Stat icon={Sprout} label="Withered" value={stats.witheredCount} />
        </div>
      </div>
    </header>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-emerald-700" />
      <div>
        <div className="text-emerald-900 font-medium leading-tight">{value}</div>
        <div className="text-emerald-700/80 text-[11px] leading-tight">{label}</div>
      </div>
    </div>
  );
}
