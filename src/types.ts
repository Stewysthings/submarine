export interface Task {
  id: string;
  text: string; // Your code uses 'text', not 'title'
  dueDate?: string; // ISO string for date/time
  allDay?: boolean; // Flag to indicate if it's an all-day task
  completed: boolean;
  priority: 'low' | 'medium' | 'high'; // Your code uses priority
  createdAt?: string; // Optional since your current code doesn't use it
}

export interface EditingState {
  id: string | null;
  text: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  allDay?: boolean; // Add this for editing
}

export type TaskCategory = 'all' | 'today' | 'thisweek' | 'thismonth' | 'someday' | 'overdue' | 'dueSoon' | 'completed';
