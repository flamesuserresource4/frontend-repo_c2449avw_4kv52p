import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import FocusTimer from './components/FocusTimer.jsx';
import Garden from './components/Garden.jsx';
import SessionHistory from './components/SessionHistory.jsx';

const SESSIONS_KEY = 'pocketree:sessions';
const GARDEN_KEY = 'pocketree:garden';

export default function App() {
  const [sessions, setSessions] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSIONS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [garden, setGarden] = useState(() => {
    try {
      const raw = localStorage.getItem(GARDEN_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(GARDEN_KEY, JSON.stringify(garden));
  }, [garden]);

  const stats = useMemo(() => {
    const completed = sessions.filter((s) => s.status === 'completed');
    const withered = sessions.filter((s) => s.status === 'withered');
    const totalMinutes = completed.reduce((acc, s) => acc + Math.round(s.duration / 60), 0);
    return { completedCount: completed.length, witheredCount: withered.length, totalMinutes };
  }, [sessions]);

  const handleSessionEnd = ({ status, duration, startedAt, endedAt }) => {
    const id = crypto.randomUUID();
    const record = { id, status, duration, startedAt, endedAt };
    setSessions((prev) => [record, ...prev]);

    if (status === 'completed') {
      // Create a new tree in the garden
      const variants = [
        { trunk: '#7c5f3b', leaves: '#34d399' },
        { trunk: '#8b5e34', leaves: '#22c55e' },
        { trunk: '#6b4f2a', leaves: '#16a34a' },
        { trunk: '#7a5230', leaves: '#10b981' },
      ];
      const pick = variants[Math.floor(Math.random() * variants.length)];
      const size = Math.min(1.4, 0.8 + duration / (25 * 60) * 0.6); // 25 min ~ base size, capped
      const tree = {
        id,
        size,
        ...pick,
        plantedAt: endedAt,
      };
      setGarden((prev) => [tree, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200 text-emerald-950">
      <Header stats={stats} />

      <main className="mx-auto max-w-6xl px-4 pb-16">
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <FocusTimer onSessionEnd={handleSessionEnd} />
            <SessionHistory sessions={sessions} />
          </div>
          <Garden trees={garden} />
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-emerald-700">
        Cultivate focus. Grow your garden.
      </footer>
    </div>
  );
}
