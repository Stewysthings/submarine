import { Dispatch, SetStateAction } from 'react';
import type { Task } from './types';

type CategoryType = "overdue" | "completed" | "all" | "today" | "thisweek" | "thismonth" | "someday" | "dueSoon";

export interface TaskListProps {  // Make sure you have 'export' here
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
  setEditText: (text: string) => void;
  setEditDueDate: (dueDate: string) => void;
  setEditPriority: (priority: 'low' | 'medium' | 'high') => void;
  saveEdit: (id: string) => void;
  cancelEdit: () => void;
  activeCategory: CategoryType;
  onCategoryChange: Dispatch<SetStateAction<CategoryType>>;
}