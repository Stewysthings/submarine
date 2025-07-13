import { useState, useEffect } from 'react';
import type { Task, EditingState } from './types';

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('tasks');
      const parsed = saved ? JSON.parse(saved) : [];
      console.log('Loaded tasks:', parsed);
      return Array.isArray(parsed)
        ? parsed.map((t: any) => ({
            id: t.id || crypto.randomUUID(),
            text: t.text || '',
            dueDate: t.dueDate || undefined,
            completed: t.completed || false,
            priority: t.priority || 'low',
          })).filter((t: Task) => t.id && t.text)
        : [];
    } catch (error) {
      console.warn('Failed to load tasks from localStorage:', error);
      return [];
    }
  });

  const [editingState, setEditingState] = useState<EditingState>({
    id: null,
    text: '',
    dueDate: '',
    priority: 'low',
  });

  useEffect(() => {
    console.log('Saving tasks:', tasks);
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, [tasks]);

  const addTask = (text: string, dueDate: string, priority: 'low' | 'medium' | 'high') => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      dueDate: dueDate || undefined,
      completed: false,
      priority: priority || 'low',
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    console.log('Deleting task ID:', id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    console.log('Toggling task ID:', id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (id: string, text: string, dueDate: string, priority: 'low' | 'medium' | 'high') => {
    console.log('Editing task ID:', id);
    setEditingState({ id, text, dueDate: dueDate || '', priority: priority || 'low' });
  };

  const saveEdit = (id: string) => {
    if (!editingState.text.trim() || editingState.id === null) return;
    console.log('Saving edit for task ID:', editingState.id, editingState);
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: editingState.text,
              dueDate: editingState.dueDate || undefined,
              priority: editingState.priority || 'low',
            }
          : task
      )
    );
    setEditingState({ id: null, text: '', dueDate: '', priority: 'low' });
  };

  const cancelEdit = () => {
    console.log('Canceling edit');
    setEditingState({ id: null, text: '', dueDate: '', priority: 'low' });
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
}