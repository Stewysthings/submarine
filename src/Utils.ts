import type { Task } from './types';

export const categoryLabels: Record<string, string> = {
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
    const [year, month, day] = dueDate.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
    const due = new Date(year, month - 1, day);
    due.setHours(0, 0, 0, 0);
    return due.getTime() < getToday().getTime();
  } catch (error) {
    console.warn('Invalid dueDate for overdue check:', dueDate);
    return false;
  }
};

export const categorizeTask = (task: Task): 'today' | 'thisweek' | 'thismonth' | 'someday' => {
  if (!task.dueDate) return 'someday';
  try {
    const [year, month, day] = task.dueDate.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return 'someday';
    const due = new Date(year, month - 1, day);
    due.setHours(0, 0, 0, 0);
    const today = getToday();
    const weekEnd = getWeekEnd();
    const monthEnd = getMonthEnd();
    if (due.getTime() === today.getTime()) return 'today';
    if (due <= weekEnd) return 'thisweek';
    if (due <= monthEnd) return 'thismonth';
    return 'someday';
  } catch (error) {
    console.error('Error categorizing task:', task, error);
    return 'someday';
  }
};