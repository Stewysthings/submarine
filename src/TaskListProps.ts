
import type { Task } from './types';

export interface TaskListProps {
  displayedTasks: [string, Task[]][] | undefined;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  startEdit: (
    id: string,
    text: string,
    dueDate: string | undefined,
    priority: 'low' | 'medium' | 'high',
    allDay: boolean,
    recurrence: 'none' | 'daily' | 'weekly' | 'monthly'
  ) => void;
  isOverdue: (dueDate: string | undefined, completed: boolean, allDay?: boolean) => boolean;
  isDueSoon: (dueDate: string | undefined, allDay?: boolean) => boolean;
  categoryLabels: { [key: string]: string };
  editingId: string | null;
  editText: string;
  editDueDate: string;
  editPriority: 'low' | 'medium' | 'high';
  editAllDay: boolean;
  editRecurrence: 'none' | 'daily' | 'weekly' | 'monthly';
  setEditText: (value: string) => void;
  setEditDueDate: (value: string) => void;
  setEditPriority: (value: 'low' | 'medium' | 'high') => void;
  setEditAllDay: (value: boolean) => void;
  setEditRecurrence: (value: 'none' | 'daily' | 'weekly' | 'monthly') => void;
  saveEdit: (id: string) => void;
  cancelEdit: () => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

