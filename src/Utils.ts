import type { Task } from './types';

export const categoryLabels: Record<string, string> = {
  overdue: 'Overdue',
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
    const due = new Date(dueDate);
    const now = new Date();
    now.setSeconds(0, 0);
    return due.getTime() < now.getTime();
  } catch (error) {
    console.warn('Invalid dueDate for overdue check:', dueDate, error);
    return false;
  }
};

export const isDueSoon = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  const now = new Date().getTime();
  const due = new Date(dueDate).getTime();
  return due > now && due <= now + 24 * 60 * 60 * 1000;
};

export const categorizeTask = (task: Task): 'today' | 'thisweek' | 'thismonth' | 'someday' => {
  if (!task.dueDate) return 'someday';
  const datePart = task.dueDate.split('T')[0];
  const [year, month, day] = datePart.split('-').map(Number);
  const due = new Date(year, month - 1, day);
  due.setHours(0, 0, 0, 0);

  const today = getToday();
  const weekEnd = getWeekEnd();
  const monthEnd = getMonthEnd();

  if (due.getTime() === today.getTime()) return 'today';
  if (due <= weekEnd) return 'thisweek';
  if (due <= monthEnd) return 'thismonth';
  return 'someday';
};