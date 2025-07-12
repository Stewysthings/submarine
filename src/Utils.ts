import type { Task } from './types';

export const categoryLabels: Record<string, string> = {
  dueSoon: 'Due Soon',
  today: 'Today',
  thisweek: 'This Week',
  thismonth: 'This Month',
  someday: 'Someday',
};

export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getWeekEnd = () => {
  const end = getToday();
  end.setDate(end.getDate() + (6 - end.getDay()));
  return end;
};

export const getMonthEnd = () => {
  const today = getToday();
  return new Date(today.getFullYear(), today.getMonth() + 1, 0);
};

export const isOverdue = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  try {
    const due = new Date(dueDate); // parses the full timestamp (YYYY-MM-DDTHH:mm)

    // optional: strip off seconds/ms
    const now = new Date();
    now.setSeconds(0, 0); // optional to align with dueDate precision

    return due.getTime() < now.getTime();
  } catch (error) {
    console.warn('Invalid dueDate for overdue check:', dueDate, error);
    return false;
  }
};



export const categorizeTask = (task: Task): 'dueSoon' | 'today' | 'thisweek' | 'thismonth' | 'someday' => {
  if (!task.dueDate) return 'someday';

  const due = new Date(task.dueDate);
  due.setSeconds(0, 0); // Align precision

  const now = new Date();
  const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);


  const today = getToday();
  const weekEnd = getWeekEnd();
  const monthEnd = getMonthEnd();

  if (due < in24Hours && due > now) return 'dueSoon';
  if (due.getTime() === today.getTime()) return 'today';
  if (due <= weekEnd) return 'thisweek';
  if (due <= monthEnd) return 'thismonth';
  return 'someday';
};
