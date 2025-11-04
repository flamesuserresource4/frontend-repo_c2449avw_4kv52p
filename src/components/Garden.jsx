export default function Garden({ trees }) {
  return (
    <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-emerald-900/5 p-5 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-emerald-900">Your Garden</h2>
          <p className="text-sm text-emerald-700">Every completed session plants a new tree.</p>
        </div>
        <div className="text-sm text-emerald-700">{trees.length} trees</div>
      </div>

      {trees.length === 0 ? (
        <EmptyGarden />
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {trees.map((t) => (
            <TreeCard key={t.id} tree={t} />)
          )}
        </div>
      )}
    </div>
  );
}

function EmptyGarden() {
  return (
    <div className="mt-8 grid place-items-center rounded-xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-8 text-center">
      <div className="text-4xl">🌱</div>
      <p className="mt-2 text-emerald-900 font-medium">No trees yet</p>
      <p className="text-sm text-emerald-700 max-w-sm">
        Start a focus session and keep this tab open until it completes. A new tree will be planted here.
      </p>
    </div>
  );
}

function TreeCard({ tree }) {
  const date = new Date(tree.plantedAt);
  return (
    <div className="rounded-xl border border-emerald-200 bg-white/60 p-4 hover:bg-white transition">
      <div className="h-28 grid place-items-center">
        <MiniTree size={tree.size} trunk={tree.trunk} leaves={tree.leaves} />
      </div>
      <div className="mt-2 text-xs text-emerald-700">
        Planted {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}

function MiniTree({ size = 1, trunk = '#7c5f3b', leaves = '#34d399' }) {
  const scale = 0.9 * size;
  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20">
      <g transform={`translate(60,80) scale(${scale})`}>
        <rect x="-4" y="-30" width="8" height="30" rx="2" fill={trunk} />
        <circle cx="0" cy="-40" r="18" fill={leaves} />
        <circle cx="-14" cy="-48" r="14" fill={leaves} />
        <circle cx="14" cy="-48" r="14" fill={leaves} />
      </g>
      <ellipse cx="60" cy="98" rx="24" ry="6" fill="#000" opacity="0.06" />
    </svg>
  );
}
