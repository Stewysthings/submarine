import type { Dispatch, SetStateAction } from 'react';
import type { Task, TaskCategory } from './types';

export interface TaskListProps {
  displayedTasks: [string, Task[]][];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  startEdit: (id: string, text: string, dueDate: string, priority: 'low' | 'medium' | 'high', allDay?: boolean) => void;
  isOverdue: (dueDate?: string, completed?: boolean, allDay?: boolean) => boolean;
  isDueSoon: (dueDate?: string, allDay?: boolean) => boolean;
  categoryLabels: Record<string, string>;
  editingId: string | null;
  editText: string;
  editDueDate: string;
  editPriority: 'low' | 'medium' | 'high';
  editAllDay: boolean;
  setEditText: Dispatch<SetStateAction<string>>;
  setEditDueDate: Dispatch<SetStateAction<string>>;
  setEditPriority: Dispatch<SetStateAction<'low' | 'medium' | 'high'>>;
  setEditAllDay: Dispatch<SetStateAction<boolean>>;
  saveEdit: (id: string) => void;
  cancelEdit: () => void;
  activeCategory: TaskCategory;
  onCategoryChange: Dispatch<SetStateAction<TaskCategory>>;
}

