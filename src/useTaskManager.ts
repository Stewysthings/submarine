import { useState } from 'react';
import type { Task } from './types';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn('Failed to load tasks from localStorage:', error);
      return [];
    }
  });

  const [editingState, setEditingState] = useState<{
    id: number | null;
    text: string;
    dueDate: string;
  }>({
    id: null,
    text: '',
    dueDate: ''
  });

  // Future extension: Add helper functions for addTask, deleteTask, etc.

  return {
    tasks,
    setTasks,
    editingState,
    setEditingState
  };
};

