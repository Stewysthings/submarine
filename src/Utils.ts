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

export function categorizeTask(task: Task): string {
  const { dueDate } = task;
  if (!dueDate) return 'someday';
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  const days = diff / (1000 * 60 * 60 * 24);
  if (days <= 0) return 'today';
  if (days <= 7) return 'thisweek';
  if (days <= 30) return 'thismonth';
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