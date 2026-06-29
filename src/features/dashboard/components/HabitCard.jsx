import { Check, Edit3, Trash2 } from 'lucide-react';
import './HabitCard.css';
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  isDoneToday,
} from '../../../shared/utils/habitStorage';

const HabitCard = ({ habit, onToggle, onEdit, onDelete }) => {
  const checked = isDoneToday(habit);
  const lastCheckIn = habit.checkIns.at(-1);

  return (
    <div className={`habit-card ${checked ? 'completed pulse-complete' : ''}`}>
      <div className="habit-card-left">
        <div className="habit-header">
          <span className="habit-color" style={{ backgroundColor: habit.color }} aria-hidden="true" />
          <h4 className="habit-title">{habit.name}</h4>
          <span className="habit-tag">{habit.category}</span>
          <span className="habit-frequency">{habit.frequency}</span>
        </div>

        {habit.description && <p className="habit-description">{habit.description}</p>}

        <div className="habit-stats">
          <div className="stat-item">
            <div className="stat-value-container">
              <span className="stat-number">{calculateCurrentStreak(habit)}</span>
            </div>
            <span className="stat-label">Current Streak</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-value-container">
              <span className="stat-number">{calculateLongestStreak(habit)}</span>
            </div>
            <span className="stat-label">Longest Streak</span>
          </div>
        </div>
      </div>

      <div className="habit-card-right">
        {checked && <span className="done-badge">Done today</span>}
        {!checked && lastCheckIn && <span className="done-badge muted-badge">Last: {lastCheckIn}</span>}
        <button className="icon-action" onClick={() => onEdit(habit)} aria-label={`Edit ${habit.name}`}>
          <Edit3 size={17} />
        </button>
        <button className="icon-action danger" onClick={() => onDelete(habit.id)} aria-label={`Delete ${habit.name}`}>
          <Trash2 size={17} />
        </button>
        <button
          className={`check-button ${checked ? 'checked' : 'unchecked'}`}
          aria-label={checked ? 'Mark as undone' : 'Mark as done'}
          onClick={() => onToggle(habit.id)}
        >
          <Check size={18} strokeWidth={3} className="check-icon" />
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
