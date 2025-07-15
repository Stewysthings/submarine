export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO string for date/time
  dueTime?: string; // Optional time in HH:MM format
  allDay?: boolean; // Flag to indicate if it's an all-day task
  completed: boolean;
  createdAt: string;
}


export interface EditingState {
  id: string | null;
  text: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

// Add this to your existing types.ts file
export type TaskCategory = 'all' | 'today' | 'thisweek' | 'thismonth' | 'someday' | 'overdue' | 'dueSoon' | 'completed';

