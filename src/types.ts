
export interface Task {
  id: string;
  text: string;
  description?: string;  // Add this field
  dueDate?: string;     // ISO string for date/time
  allDay?: boolean;     // Flag to indicate if it's an all-day task
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;   // Optional since not all code uses it
}

export interface EditingState {
  id: string | null;
  text: string;
  description?: string;  // Add this field
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  allDay: boolean;
}