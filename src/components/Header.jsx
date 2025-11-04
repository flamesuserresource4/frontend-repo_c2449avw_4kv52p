import { Leaf, Sprout, Timer } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Header({ stats }) {
  return (
    <header>
      <div className="relative h-72 w-full overflow-hidden">
        <Spline scene="https://prod.spline.design/4TrRyLcIHhcItjnk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-50 via-emerald-50/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl w-full px-4 pb-6 flex items-center justify-between gap-6">
            <div className="pointer-events-auto flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-600/10 grid place-items-center">
                <Sprout className="h-6 w-6 text-emerald-50" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-white drop-shadow">PockeTree</h1>
                <p className="text-xs text-emerald-100 drop-shadow">Focus to grow your virtual garden</p>
              </div>
            </div>
            <div className="pointer-events-auto hidden sm:flex items-center gap-6 text-sm">
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
    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur ring-1 ring-white/20">
      <Icon className="h-4 w-4 text-white" />
      <div>
        <div className="text-white font-medium leading-tight">{value}</div>
        <div className="text-emerald-100 text-[11px] leading-tight">{label}</div>
      </div>
    </div>
  );
}
