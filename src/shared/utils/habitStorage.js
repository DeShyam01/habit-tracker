const HABITS_KEY = 'habits';
const FREEZE_KEY = 'habitFreezeToken';

export const todayKey = () => toDateKey(new Date());

export const toDateKey = (date) => {
  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate.toISOString().slice(0, 10);
};

export const getLastDays = (days = 30) => {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - index - 1));
    return toDateKey(date);
  });
};

export const loadHabits = () => {
  try {
    const rawHabits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]');
    return rawHabits.map(normalizeHabit);
  } catch {
    return [];
  }
};

export const saveHabits = (habits) => {
  const normalizedHabits = habits.map(normalizeHabit);
  localStorage.setItem(HABITS_KEY, JSON.stringify(normalizedHabits));
  window.dispatchEvent(new Event('habits-updated'));
  return normalizedHabits;
};

export const normalizeHabit = (habit) => {
  const checkIns = Array.isArray(habit.checkIns)
    ? habit.checkIns
    : habit.isCompleted
      ? [todayKey()]
      : [];

  return {
    id: habit.id || crypto.randomUUID(),
    name: habit.name || 'Untitled habit',
    category: habit.category || 'Custom',
    frequency: habit.frequency || 'Daily',
    description: habit.description || '',
    color: habit.color || getCategoryColor(habit.category || 'Custom'),
    checkIns: [...new Set(checkIns)].sort(),
    pomodoroMinutes: Number(habit.pomodoroMinutes || 0),
    createdAt: habit.createdAt || new Date().toISOString(),
  };
};

export const createHabit = (values) => {
  return normalizeHabit({
    id: crypto.randomUUID(),
    ...values,
    createdAt: new Date().toISOString(),
  });
};

export const isDoneToday = (habit) => habit.checkIns.includes(todayKey());

export const toggleToday = (habit) => {
  const today = todayKey();
  const checkIns = habit.checkIns.includes(today)
    ? habit.checkIns.filter((date) => date !== today)
    : [...habit.checkIns, today];

  return normalizeHabit({ ...habit, checkIns });
};

export const calculateCurrentStreak = (habit) => {
  const checkedDates = new Set(habit.checkIns);
  let streak = 0;
  const cursor = new Date();

  while (checkedDates.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

export const calculateLongestStreak = (habit) => {
  const checkedDates = [...new Set(habit.checkIns)].sort();
  let longest = 0;
  let current = 0;
  let previousDate = null;

  checkedDates.forEach((dateKey) => {
    const date = new Date(`${dateKey}T00:00:00`);
    if (previousDate) {
      const diffDays = Math.round((date - previousDate) / 86400000);
      current = diffDays === 1 ? current + 1 : 1;
    } else {
      current = 1;
    }
    longest = Math.max(longest, current);
    previousDate = date;
  });

  return longest;
};

export const getHabitCompletionRate = (habit, days = 30) => {
  const dates = getLastDays(days);
  const completed = dates.filter((date) => habit.checkIns.includes(date)).length;
  return Math.round((completed / days) * 100);
};

export const getAllStats = (habits) => {
  const totalCheckIns = habits.reduce((sum, habit) => sum + habit.checkIns.length, 0);
  const todayCompleted = habits.filter(isDoneToday).length;
  const longestStreak = habits.reduce((max, habit) => Math.max(max, calculateLongestStreak(habit)), 0);
  const currentStreak = habits.reduce((max, habit) => Math.max(max, calculateCurrentStreak(habit)), 0);
  const possibleLast30 = Math.max(habits.length * 30, 1);
  const last30CheckIns = habits.reduce((sum, habit) => {
    const validDates = new Set(getLastDays(30));
    return sum + habit.checkIns.filter((date) => validDates.has(date)).length;
  }, 0);

  return {
    totalHabits: habits.length,
    totalCheckIns,
    todayCompleted,
    completionRate: Math.round((last30CheckIns / possibleLast30) * 100),
    longestStreak,
    currentStreak,
  };
};

export const getBestHabit = (habits) => {
  return habits.reduce((best, habit) => {
    const rate = getHabitCompletionRate(habit, 30);
    if (!best || rate > best.rate) {
      return { ...habit, rate };
    }
    return best;
  }, null);
};

export const getMomentumScore = (habits) => {
  if (!habits.length) return 0;
  const dates = getLastDays(14);
  const maxWeight = dates.reduce((sum, _, index) => sum + index + 1, 0) * habits.length;
  const score = habits.reduce((total, habit) => {
    return total + dates.reduce((habitScore, date, index) => {
      return habitScore + (habit.checkIns.includes(date) ? index + 1 : 0);
    }, 0);
  }, 0);

  return Math.round((score / maxWeight) * 100);
};

export const getDailyCompletions = (habits, date, category = 'All') => {
  return habits
    .filter((habit) => category === 'All' || habit.category === category)
    .filter((habit) => habit.checkIns.includes(date)).length;
};

export const getFreezeToken = () => {
  const now = Date.now();
  const current = JSON.parse(localStorage.getItem(FREEZE_KEY) || 'null');
  if (current && current.expiresAt > now) return current;

  const next = {
    available: true,
    expiresAt: now + 7 * 24 * 60 * 60 * 1000,
  };
  localStorage.setItem(FREEZE_KEY, JSON.stringify(next));
  return next;
};

export const spendFreezeToken = () => {
  const token = getFreezeToken();
  const spent = { ...token, available: false };
  localStorage.setItem(FREEZE_KEY, JSON.stringify(spent));
  return spent;
};

export const getCategoryColor = (category) => {
  const colors = {
    Health: '#10b981',
    Productivity: '#6366f1',
    Custom: '#f59e0b',
    Learning: '#06b6d4',
    Finance: '#84cc16',
    Relationships: '#ec4899',
  };

  return colors[category] || colors.Custom;
};
