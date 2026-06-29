import { useMemo, useState } from 'react';
import {
  calculateCurrentStreak,
  getDailyCompletions,
  getLastDays,
} from '../../../shared/utils/habitStorage';
import './ConsistencyGrid.css';

const ConsistencyGrid = ({ habits }) => {
  const [category, setCategory] = useState('All');
  const dates = getLastDays(30);
  const categories = useMemo(() => ['All', ...new Set(habits.map((habit) => habit.category))], [habits]);
  const bestStreak = habits.reduce((max, habit) => Math.max(max, calculateCurrentStreak(habit)), 0);

  const message = bestStreak >= 7
    ? 'That streak has serious main-character energy.'
    : bestStreak >= 3
      ? 'Momentum is warming up. Keep stacking days.'
      : 'Start with one honest check-in today.';

  return (
    <section className="consistency-section">
      <div className="section-heading-row">
        <div>
          <h3>Consistency Grid</h3>
          <p>{message}</p>
        </div>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="category-filter">
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="heatmap-grid" aria-label="Habit completion heatmap">
        {dates.map((date) => {
          const count = getDailyCompletions(habits, date, category);
          const level = Math.min(count, 4);
          return (
            <div
              className={`heatmap-cell level-${level}`}
              key={date}
              title={`${date}: ${count} habit${count === 1 ? '' : 's'} completed`}
            >
              <span className="tooltip">{date}: {count} done</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ConsistencyGrid;
