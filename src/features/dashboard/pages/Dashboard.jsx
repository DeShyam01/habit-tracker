import { useEffect, useState } from 'react';
import { Plus, ShieldCheck } from 'lucide-react';
import Button from '../../../shared/components/Button';
import './Dashboard.css';
import AddHabitForm from '../components/AddHabitForm';
import ProgressBar from '../components/ProgressBar';
import HabitCard from '../components/HabitCard';
import ConsistencyGrid from '../components/ConsistencyGrid';
import PomodoroTimer from '../components/PomodoroTimer';
import {
  getAllStats,
  getFreezeToken,
  loadHabits,
  saveHabits,
  spendFreezeToken,
  toggleToday,
} from '../../../shared/utils/habitStorage';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitList, setHabitList] = useState(() => loadHabits());
  const [editingHabit, setEditingHabit] = useState(null);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [freezeToken, setFreezeToken] = useState(() => getFreezeToken());

  useEffect(() => {
    saveHabits(habitList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistHabits = (nextHabits) => {
    setHabitList(saveHabits(nextHabits));
  };

  const handleSubmitHabit = (habit) => {
    const exists = habitList.some((item) => item.id === habit.id);
    const nextHabits = exists
      ? habitList.map((item) => (item.id === habit.id ? habit : item))
      : [...habitList, habit];
    persistHabits(nextHabits);
  };

  const handleToggle = (habitId) => {
    persistHabits(habitList.map((habit) => (habit.id === habitId ? toggleToday(habit) : habit)));
  };

  const handleDelete = (habitId) => {
    setHabitToDelete(habitList.find((habit) => habit.id === habitId));
  };

  const confirmDelete = () => {
    if (!habitToDelete) return;
    persistHabits(habitList.filter((habit) => habit.id !== habitToDelete.id));
    setHabitToDelete(null);
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingHabit(null);
    setIsModalOpen(false);
  };

  const handlePomodoroComplete = (habitId, minutes) => {
    persistHabits(habitList.map((habit) => (
      habit.id === habitId
        ? { ...habit, pomodoroMinutes: habit.pomodoroMinutes + minutes }
        : habit
    )));
  };

  const stats = getAllStats(habitList);

  return (
    <>
      {isModalOpen && (
        <>
          <div className="overlay" onClick={handleCloseModal}></div>
          <AddHabitForm
            habit={editingHabit}
            onSubmit={handleSubmitHabit}
            onClose={handleCloseModal}
          />
        </>
      )}

      {habitToDelete && (
        <>
          <div className="overlay" onClick={() => setHabitToDelete(null)}></div>
          <div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <h3 id="delete-title">Delete this habit?</h3>
            <p>
              Are you sure you want to delete <strong>{habitToDelete.name}</strong>? This will also remove its
              saved check-ins and streak history.
            </p>
            <div className="confirm-actions">
              <button className="secondary-action" onClick={() => setHabitToDelete(null)}>
                Cancel
              </button>
              <button className="danger-action" onClick={confirmDelete}>
                Delete Habit
              </button>
            </div>
          </div>
        </>
      )}

      <main className="dashboard">
        <div className="dashboard-heading">
          <div className="quote">
            <h2>Welcome back</h2>
            <p className="subtitle">Build an extraordinary life, one honest check-in at a time.</p>
          </div>
          <Button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
            Add Habit <Plus size={18} />
          </Button>
        </div>

        <div className="quick-stats">
          <div>
            <span>{stats.totalHabits}</span>
            <p>Total Habits</p>
          </div>
          <div>
            <span>{stats.todayCompleted}</span>
            <p>Done Today</p>
          </div>
          <div>
            <span>{stats.longestStreak}</span>
            <p>Longest Streak</p>
          </div>
          <div className="freeze-card">
            <ShieldCheck size={20} />
            <span>{freezeToken?.available ? '1' : '0'}</span>
            <p>Freeze Token</p>
            {freezeToken?.available && (
              <button className="text-button" onClick={() => setFreezeToken(spendFreezeToken())}>
                Use
              </button>
            )}
          </div>
        </div>

        <ProgressBar
          heading="Today's Progress"
          subtitle={stats.todayCompleted === habitList.length && habitList.length ? 'All habits done today.' : 'Keep the streak moving.'}
          completed={stats.todayCompleted}
          total={habitList.length}
        />

        {habitList.length > 0 && (
          <PomodoroTimer habits={habitList} onSessionComplete={handlePomodoroComplete} />
        )}

        <section className="habit-list">
          <h3>Today's Habits</h3>
          {habitList.length > 0 ? (
            habitList.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">Target</div>
              <h3>No habits yet</h3>
              <p className="empty-subtitle">Create your first habit and start stacking proof.</p>
              <Button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
                Add Habit <Plus size={18} />
              </Button>
            </div>
          )}
        </section>

        <ConsistencyGrid habits={habitList} />
      </main>
    </>
  );
};

export default Dashboard;
