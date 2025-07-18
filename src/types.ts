
export interface Task {
  id: string;
  text: string;
  description?: string;
  dueDate?: string;
  allDay?: boolean;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly'; // New field
}

export interface EditingState {
  id: string | null;
  text: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  allDay: boolean;
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly'; // New field
}
