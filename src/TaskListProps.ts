import type { Dispatch, SetStateAction } from 'react';
import type { Task, TaskCategory } from './types';

export interface TaskListProps {
  displayedTasks: [string, Task[]][];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  startEdit: (id: string, text: string, dueDate: string, priority: 'low' | 'medium' | 'high') => void;
  isOverdue: (dueDate?: string, completed?: boolean) => boolean;
  isDueSoon: (dueDate?: string) => boolean;
  categoryLabels: Record<string, string>;
  editingId: string | null;
  editText: string;
  editDueDate: string;
  editPriority: 'low' | 'medium' | 'high';
  setEditText: Dispatch<SetStateAction<string>>;
  setEditDueDate: Dispatch<SetStateAction<string>>;
  setEditPriority: Dispatch<SetStateAction<'low' | 'medium' | 'high'>>;
  saveEdit: (id: string) => void;
  cancelEdit: () => void;
  activeCategory: TaskCategory;
  onCategoryChange: Dispatch<SetStateAction<TaskCategory>>;
}

