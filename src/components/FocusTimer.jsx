import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RefreshCw, EyeOff } from 'lucide-react';

const formatTime = (secs) => {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(secs % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

export default function FocusTimer({ onSessionEnd, onProgress, onStatusChange }) {
  const [minutes, setMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | running | paused | withered | completed
  const startRef = useRef(null);

  // keep seconds synced with minutes input when idle/paused
  useEffect(() => {
    if (!running && (status === 'idle' || status === 'paused')) {
      setSecondsLeft(Math.max(1, Math.floor(minutes * 60)));
    }
  }, [minutes, running, status]);

  // timer loop
  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) return;

    const id = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running, secondsLeft]);

  // completion detection
  useEffect(() => {
    if (running && secondsLeft <= 0) {
      setRunning(false);
      setStatus('completed');
    }
  }, [running, secondsLeft]);

  // propagate status
  useEffect(() => {
    onStatusChange?.(status);
    if (status === 'completed') {
      const now = new Date().toISOString();
      onSessionEnd?.({
        status: 'completed',
        duration: startRef.current?.durationSec ?? minutes * 60,
        startedAt: startRef.current?.startedAt ?? now,
        endedAt: now,
      });
    }
  }, [status]);

  // visibility change -> wither
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && running) {
        setRunning(false);
        setStatus('withered');
        const now = new Date().toISOString();
        onSessionEnd?.({
          status: 'withered',
          duration: startRef.current?.durationSec ?? minutes * 60,
          startedAt: startRef.current?.startedAt ?? now,
          endedAt: now,
        });
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [running, onSessionEnd, minutes]);

  const progress = useMemo(() => {
    const total = startRef.current?.durationSec ?? minutes * 60;
    const passed = total - secondsLeft;
    return Math.min(1, Math.max(0, passed / total));
  }, [secondsLeft, minutes]);

  // propagate progress to parent
  useEffect(() => {
    onProgress?.(progress);
  }, [progress, onProgress]);

  const circumference = 276.46; // 2 * Math.PI * r for r=44
  const dash = circumference;
  const offset = dash - dash * progress;

  const start = () => {
    const durationSec = Math.max(10, Math.floor(minutes * 60));
    startRef.current = { startedAt: new Date().toISOString(), durationSec };
    setSecondsLeft(durationSec);
    setStatus('running');
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
    setStatus('paused');
  };

  const reset = () => {
    setRunning(false);
    setStatus('idle');
    setSecondsLeft(Math.max(1, Math.floor(minutes * 60)));
  };

  return (
    <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-emerald-900/5 p-5">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-emerald-900">Focus Timer</h2>
          <p className="text-sm text-emerald-700">Keep this tab active until the timer completes.</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-emerald-800">Minutes</label>
          <input
            type="number"
            min={1}
            max={120}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-24 rounded-xl border border-emerald-300 bg-white/80 px-3 py-2 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-[auto,1fr]">
        <div className="mx-auto w-[140px] h-[140px]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="44" stroke="#dcfce7" strokeWidth="8" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#10b981"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={dash}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
            <text x="50" y="53" textAnchor="middle" className="fill-emerald-900 font-semibold" fontSize="18">
              {formatTime(secondsLeft)}
            </text>
          </svg>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {status !== 'running' ? (
              <button
                onClick={start}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700 active:translate-y-[1px]"
              >
                <Play className="h-4 w-4" /> Start
              </button>
            ) : (
              <button
                onClick={pause}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-white shadow hover:bg-amber-600 active:translate-y-[1px]"
              >
                <Pause className="h-4 w-4" /> Pause
              </button>
            )}

            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-emerald-900 shadow-sm ring-1 ring-emerald-900/10 hover:bg-emerald-100"
            >
              <RefreshCw className="h-4 w-4" /> Reset
            </button>

            {status === 'withered' && (
              <span className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-1 text-sm text-red-700 ring-1 ring-red-200">
                <EyeOff className="h-4 w-4" /> You left the app — session withered
              </span>
            )}
            {status === 'completed' && (
              <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-1 text-sm text-emerald-700 ring-1 ring-emerald-200">
                🌳 Great job! Your tree has been planted
              </span>
            )}
          </div>

          <p className="text-sm text-emerald-800/90">
            Tip: Switching tabs while running will wither the session.
          </p>
        </div>
      </div>
    </div>
  );
}
