
import type { Task } from './types';

export function isOverdue(dueDate?: string, completed: boolean = false, allDay: boolean = false): boolean {
  if (completed || !dueDate) return false;
  const now = new Date();
  const due = new Date(dueDate);
  
  if (allDay) {
    // For all-day tasks, only overdue if the date has passed
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }
  
  return due < now;
}

export function isDueSoon(dueDate?: string, allDay: boolean = false): boolean {
  if (!dueDate) return false;
  const now = new Date();
  const due = new Date(dueDate);
  
  if (allDay) {
    // For all-day tasks, check if it's today or tomorrow
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    due.setHours(0, 0, 0, 0);
    return due >= today && due < tomorrow;
  }
  
  const diff = due.getTime() - now.getTime();
  return diff >= 0 && diff <= 24 * 60 * 60 * 1000;
}

export function getNextDueDate(dueDate: string, recurrence: 'daily' | 'weekly' | 'monthly', allDay: boolean = false): string {
  const date = new Date(dueDate);
  if (recurrence === 'daily') {
    date.setDate(date.getDate() + 1);
  } else if (recurrence === 'weekly') {
    date.setDate(date.getDate() + 7);
  } else if (recurrence === 'monthly') {
    date.setMonth(date.getMonth() + 1);
  }
  if (allDay) {
    return date.toISOString().split('T')[0]; // Return date only for all-day tasks
  }
  return date.toISOString().slice(0, 16); // Return date and time for timed tasks
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
  const { dueDate, allDay } = task;
  if (!dueDate) return 'someday';
  
  const now = new Date();
  const due = new Date(dueDate);
  
  // For all-day tasks, compare dates only
  if (allDay) {
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const dueDay = new Date(due);
    dueDay.setHours(0, 0, 0, 0);
    
    if (dueDay.getTime() === today.getTime()) return 'today';
    if (dueDay < today) return 'today'; // overdue all-day tasks show as today
    
    const endOfThisWeek = getEndOfWeek(now);
    endOfThisWeek.setHours(0, 0, 0, 0);
    if (dueDay <= endOfThisWeek) return 'thisweek';
    
    const endOfThisMonth = getEndOfMonth(now);
    endOfThisMonth.setHours(0, 0, 0, 0);
    if (dueDay <= endOfThisMonth) return 'thismonth';
    
    return 'someday';
  }
  
  // For timed tasks, use the existing logic
  const today = new Date(now);
  today.setHours(23, 59, 59, 999);
  if (due <= today) return 'today';
  
  const endOfThisWeek = getEndOfWeek(now);
  if (due <= endOfThisWeek) return 'thisweek';
  
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
