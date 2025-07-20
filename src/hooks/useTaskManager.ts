
import { useState, useEffect } from 'react';
import type { Task, EditingState } from '../types';
import { getNextDueDate } from './utils';

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
            allDay: t.allDay || false,
            recurrence: t.recurrence || 'none',
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
    allDay: false,
    recurrence: 'none',
  });

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, [tasks]);

  const addTask = (
    text: string,
    dueDate: string,
    priority: 'low' | 'medium' | 'high',
    allDay: boolean = false,
    recurrence: 'none' | 'daily' | 'weekly' | 'monthly' = 'none'
  ) => {
    if (!text.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      dueDate: dueDate || '',
      completed: false,
      priority: priority || 'low',
      allDay: allDay,
      recurrence: recurrence,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, completed: !task.completed };
          if (task.recurrence !== 'none' && !task.completed && task.dueDate) {
            const newTask: Task = {
              ...task,
              id: crypto.randomUUID(),
              dueDate: getNextDueDate(task.dueDate, task.recurrence, task.allDay),
              completed: false,
            };
            return [updatedTask, newTask];
          }
          return updatedTask;
        }
        return task;
      }).flat()
    );
  };

  const startEdit = (
    id: string,
    text: string,
    dueDate: string | undefined,
    priority: 'low' | 'medium' | 'high',
    allDay: boolean = false,
    recurrence: 'none' | 'daily' | 'weekly' | 'monthly' = 'none'
  ) => {
    setEditingState({
      id,
      text,
      dueDate: dueDate || '',
      priority: priority || 'low',
      allDay: allDay,
      recurrence: recurrence,
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
              recurrence: editingState.recurrence || 'none',
            }
          : task
      )
    );
    setEditingState({ id: null, text: '', dueDate: '', priority: 'low', allDay: false, recurrence: 'none' });
  };

  const cancelEdit = () => {
    setEditingState({ id: null, text: '', dueDate: '', priority: 'low', allDay: false, recurrence: 'none' });
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