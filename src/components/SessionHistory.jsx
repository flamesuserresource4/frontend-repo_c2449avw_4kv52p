import { CheckCircle2, Skull } from 'lucide-react';

export default function SessionHistory({ sessions }) {
  return (
    <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-emerald-900/5 p-5">
      <h2 className="text-lg font-semibold text-emerald-900">Session History</h2>
      {sessions.length === 0 ? (
        <p className="mt-3 text-sm text-emerald-700">Your recent focus sessions will appear here.</p>
      ) : (
        <ul className="mt-4 divide-y divide-emerald-100/70">
          {sessions.map((s) => (
            <HistoryRow key={s.id} s={s} />
          ))}
        </ul>
      )}
    </div>
  );
}

function HistoryRow({ s }) {
  const started = new Date(s.startedAt);
  const ended = new Date(s.endedAt);
  const mins = Math.round(s.duration / 60);
  const success = s.status === 'completed';
  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {success ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        ) : (
          <Skull className="h-5 w-5 text-red-500" />
        )}
        <div>
          <div className="text-sm font-medium text-emerald-900">
            {success ? 'Completed' : 'Withered'} session • {mins} min
          </div>
          <div className="text-xs text-emerald-700">
            {started.toLocaleDateString()} {started.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} →{' '}
            {ended.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </li>
  );
}
