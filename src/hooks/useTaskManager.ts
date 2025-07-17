import { useState, useEffect } from 'react';
import type { Task, EditingState } from '../types';

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('tasks');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed)
        ? parsed.map((t: any) => ({
            id: t.id || crypto.randomUUID(),
            text: t.text || '',
            dueDate: t.dueDate || undefined,
            completed: t.completed || false,
            priority: t.priority || 'low',
            allDay: t.allDay || false, // Add this
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
    allDay: false, // Add this
  });

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, [tasks]);

  // Update addTask to accept allDay parameter
  const addTask = (text: string, dueDate: string, priority: 'low' | 'medium' | 'high', allDay: boolean = false) => {
    if (!text.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      dueDate: dueDate || '',
      completed: false,
      priority: priority || 'low',
      allDay: allDay,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Update startEdit to include allDay
  const startEdit = (id: string, text: string, dueDate: string | undefined, priority: 'low' | 'medium' | 'high', allDay: boolean = false) => {
    setEditingState({
      id,
      text,
      dueDate: dueDate || '',
      priority: priority || 'low',
      allDay: allDay,
    });
  };

  const saveEdit = (id: string) => {
    if (!editingState.text.trim() || editingState.id === null) {
      cancelEdit();
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: editingState.text.trim(),
              dueDate: editingState.dueDate,
              priority: editingState.priority || 'low',
              allDay: editingState.allDay || false,
            }
          : task
      )
    );
    setEditingState({ id: null, text: '', dueDate: '', priority: 'low', allDay: false });
  };

  const cancelEdit = () => {
    setEditingState({ id: null, text: '', dueDate: '', priority: 'low', allDay: false });
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
