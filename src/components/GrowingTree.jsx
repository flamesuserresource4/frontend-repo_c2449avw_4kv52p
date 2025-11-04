export default function GrowingTree({ progress = 0, status = 'idle' }) {
  const pct = Math.max(0, Math.min(1, progress));
  const trunkHeight = 18 + pct * 26;
  const canopyScale = 0.7 + pct * 0.9;
  const hue = 150 + pct * 40; // greener as it grows
  const leaf = `hsl(${hue} 60% 45%)`;
  const trunk = '#7c5f3b';

  return (
    <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-emerald-900/5 p-5 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-emerald-900">Growing Tree</h2>
          <p className="text-sm text-emerald-700">Watch your focus nurture a tree in real-time.</p>
        </div>
        <StatusPill status={status} />
      </div>

      <div className="mt-6 grid place-items-center">
        <div className="relative w-full max-w-sm aspect-[4/3]">
          <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ecfdf5" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="200" height="150" fill="url(#g)" rx="16" />

            <ellipse cx="100" cy="120" rx="60" ry="10" fill="#000" opacity="0.06" />

            <g transform="translate(100,120)">
              <rect x="-5" y={-trunkHeight} width="10" height={trunkHeight} rx="3" fill={trunk} />
              <g transform={`translate(0,${-trunkHeight}) scale(${canopyScale})`}>
                <circle cx="0" cy="-26" r="22" fill={leaf} />
                <circle cx="-18" cy="-18" r="18" fill={leaf} />
                <circle cx="18" cy="-18" r="18" fill={leaf} />
                <circle cx="0" cy="-6" r="16" fill={leaf} />
              </g>
            </g>
          </svg>
        </div>
        <div className="mt-3 text-sm text-emerald-800">
          {status === 'running' && <span>Tree growing… {Math.round(pct * 100)}%</span>}
          {status === 'paused' && <span>Paused — tree resting</span>}
          {status === 'completed' && <span>Fully grown — added to your garden 🌳</span>}
          {status === 'withered' && <span className="text-red-600">Withered — stay focused next time</span>}
          {status === 'idle' && <span>Set a timer and start to grow</span>}
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    idle: { text: 'Idle', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
    running: { text: 'Growing', cls: 'bg-emerald-100 text-emerald-800 ring-emerald-300' },
    paused: { text: 'Paused', cls: 'bg-amber-50 text-amber-700 ring-amber-200' },
    completed: { text: 'Completed', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
    withered: { text: 'Withered', cls: 'bg-red-50 text-red-700 ring-red-200' },
  };
  const m = map[status] ?? map.idle;
  return <span className={`rounded-xl px-3 py-1 text-xs ring-1 ${m.cls}`}>{m.text}</span>;
}
