import type { Task } from './types';

export function isOverdue(dueDate?: string, completed: boolean = false): boolean {
  if (completed || !dueDate) return false;
  const now = new Date();
  const due = new Date(dueDate);
  return due < now;
}

export function isDueSoon(dueDate?: string): boolean {
  if (!dueDate) return false;
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  return diff >= 0 && diff <= 24 * 60 * 60 * 1000;
}

function getEndOfWeek(date: Date): Date {
  const endOfWeek = new Date(date);
  const day = endOfWeek.getDay();
  const daysUntilSunday = (7 - day) % 7;
  endOfWeek.setDate(endOfWeek.getDate() + daysUntilSunday);
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
}

function getEndOfMonth(date: Date): Date {
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);
  return endOfMonth;
}

export function categorizeTask(task: Task): string {
  const { dueDate } = task;
  if (!dueDate) return 'someday';
  
  const now = new Date();
  const due = new Date(dueDate);
  
  // Check if it's today
  const today = new Date(now);
  today.setHours(23, 59, 59, 999);
  if (due <= today) return 'today';
  
  // Check if it's this week (until end of current calendar week)
  const endOfThisWeek = getEndOfWeek(now);
  if (due <= endOfThisWeek) return 'thisweek';
  
  // Check if it's this month
  const endOfThisMonth = getEndOfMonth(now);
  if (due <= endOfThisMonth) return 'thismonth';
  
  return 'someday';
}

export const categoryLabels: Record<string, string> = {
  all: 'All Tasks',
  overdue: 'Overdue',
  dueSoon: 'Due Soon',
  today: 'Today',
  thisweek: 'This Week',
  thismonth: 'This Month',
  someday: 'Someday',
  completed: 'Completed',
};
