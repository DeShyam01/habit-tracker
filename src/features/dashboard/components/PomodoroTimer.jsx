import { useEffect, useMemo, useState } from 'react';
import Button from '../../../shared/components/Button';
import './PomodoroTimer.css';

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

const PomodoroTimer = ({ habits, onSessionComplete }) => {
  const [selectedHabitId, setSelectedHabitId] = useState(habits[0]?.id || '');
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(WORK_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const activeHabitId = selectedHabitId || habits[0]?.id || '';

  const selectedHabit = useMemo(
    () => habits.find((habit) => habit.id === activeHabitId),
    [habits, activeHabitId],
  );

  useEffect(() => {
    if (!isRunning) return undefined;
    const timerId = setInterval(() => {
      setSecondsLeft((current) => {
        if (current > 1) return current - 1;
        setIsRunning(false);
        if (mode === 'work' && selectedHabit) onSessionComplete(selectedHabit.id, 25);
        const nextMode = mode === 'work' ? 'break' : 'work';
        setMode(nextMode);
        return nextMode === 'work' ? WORK_SECONDS : BREAK_SECONDS;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, mode, onSessionComplete, selectedHabit]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const reset = (nextMode = mode) => {
    setIsRunning(false);
    setMode(nextMode);
    setSecondsLeft(nextMode === 'work' ? WORK_SECONDS : BREAK_SECONDS);
  };

  return (
    <section className="pomodoro-panel">
      <div>
        <p className="eyebrow">Pomodoro Timer</p>
        <h3>{minutes}:{seconds}</h3>
        <p>{mode === 'work' ? '25 minute focus sprint' : '5 minute reset break'}</p>
      </div>
      <div className="pomodoro-controls">
        <select value={activeHabitId} onChange={(event) => setSelectedHabitId(event.target.value)}>
          <option value="" disabled>Link a habit</option>
          {habits.map((habit) => (
            <option key={habit.id} value={habit.id}>{habit.name}</option>
          ))}
        </select>
        <Button onClick={() => setIsRunning((running) => !running)} disabled={!activeHabitId}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <button className="text-button" onClick={() => reset(mode)}>Reset</button>
        <button className="text-button" onClick={() => reset(mode === 'work' ? 'break' : 'work')}>
          Switch
        </button>
      </div>
    </section>
  );
};

export default PomodoroTimer;
