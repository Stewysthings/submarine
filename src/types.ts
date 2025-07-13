export interface Task {
  id: string;
  text: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface EditingState {
  id: string | null;
  text: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}