import { Star, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  calculateCurrentStreak,
  getAllStats,
  getBestHabit,
  getHabitCompletionRate,
  getMomentumScore,
  loadHabits,
} from '../../../shared/utils/habitStorage';
import './Insights.css';

const Insights = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const sync = () => setHabits(loadHabits());
    sync();
    window.addEventListener('habits-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('habits-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const stats = getAllStats(habits);
  const bestHabit = getBestHabit(habits);
  const momentum = getMomentumScore(habits);

  return (
    <main className="insights-page">
      <section className="insights-header">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center' }}>
          <h2>Your habit scoreboard</h2>
          <p>Every number here is calculated from your saved check-ins.</p>
        </div>
        {bestHabit && (
          <div className="best-habit">
            <Trophy size={26} />
            <span>Best Habit</span>
            <strong>{bestHabit.name}</strong>
            <small>{bestHabit.rate}% over 30 days</small>
          </div>
        )}
      </section>

      <section className="stat-grid">
        <div><span>{stats.totalHabits}</span><p>Total Habits</p></div>
        <div><span>{stats.completionRate}%</span><p>Completion Rate</p></div>
        <div><span>{stats.longestStreak}</span><p>Longest Streak</p></div>
        <div><span>{stats.currentStreak}</span><p>Current Streak</p></div>
      </section>

      <section className="momentum-panel">
        <div>
          <h3>Habit Momentum</h3>
          <p>Recent check-ins count more, so this score reacts fast when you get back on track.</p>
        </div>
        <strong>{momentum}</strong>
        <div className="momentum-bar">
          <span style={{ width: `${momentum}%` }}></span>
        </div>
      </section>

      <section className="habit-insight-list">
        <h3>Per Habit Breakdown</h3>
        {habits.length ? habits.map((habit) => (
          <article className="habit-insight-card" key={habit.id}>
            <div>
              <h4>{habit.name}</h4>
              <p>{habit.category}</p>
            </div>
            <div>
              <Star size={18} />
              <span>{calculateCurrentStreak(habit)} day streak</span>
            </div>
            <strong>{getHabitCompletionRate(habit, 7)}% last 7 days</strong>
          </article>
        )) : (
          <p className="empty-copy">Add a habit and complete a check-in to unlock insights.</p>
        )}
      </section>
    </main>
  );
};

export default Insights;
