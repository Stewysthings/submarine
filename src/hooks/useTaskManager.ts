import { useState, useEffect } from 'react';
import type { Task } from '../types';
export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('tasks');
      const parsed = saved ? JSON.parse(saved) : [];
      console.log('Loaded tasks:', parsed);
      return Array.isArray(parsed)
        ? parsed.filter((t: any) => t.id && t.text)
        : [];
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
    dueDate: '',
  });

  useEffect(() => {
    console.log('Saving tasks:', tasks);
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, [tasks]);

  const addTask = (text: string, dueDate: string) => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      dueDate: dueDate || undefined,
    };
    console.log('Adding task:', newTask);
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    console.log('Deleting task ID:', id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    console.log('Toggling task ID:', id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (id: number, text: string, dueDate?: string) => {
    console.log('Editing task ID:', id);
    setEditingState({ id, text, dueDate: dueDate || '' });
  };

  const saveEdit = () => {
    if (!editingState.text.trim() || editingState.id === null) return;
    console.log('Saving edit for task ID:', editingState.id, editingState);
    setTasks(
      tasks.map((task) =>
        task.id === editingState.id
          ? {
              ...task,
              text: editingState.text,
              dueDate: editingState.dueDate || undefined,
            }
          : task
      )
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    console.log('Canceling edit');
    setEditingState({ id: null, text: '', dueDate: '' });
  };

  return {
    tasks,
    setTasks,
    editingState,
    setEditingState,
    addTask,
    deleteTask,
    toggleTask,
    startEdit,
    saveEdit,
    cancelEdit,
  };
};