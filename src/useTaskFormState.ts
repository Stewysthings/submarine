
import { useState } from 'react';
import type { Task } from './types';

interface FormState {
  text: string;
  description: string;
  dueDate: string;
  dueTime: string;
  allDay: boolean;
  priority: 'low' | 'medium' | 'high';
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly';
}

export function useTaskFormState(initialTask?: Partial<Task>) {
  const [formState, setFormState] = useState<FormState>({
    text: initialTask?.text || '',
    description: initialTask?.description || '',
    dueDate: initialTask?.dueDate
      ? new Date(initialTask.dueDate).toISOString().split('T')[0]
      : '',
    dueTime: initialTask?.dueDate && !initialTask.allDay
      ? initialTask.dueDate.split('T')[1]?.slice(0, 5) || ''
      : '',
    allDay: initialTask?.allDay || false,
    priority: initialTask?.priority || 'low',
    recurrence: initialTask?.recurrence || 'none',
  });

  const updateField = (field: keyof FormState) => (
    value: string | boolean
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'dueDate' && !value ? { dueTime: '', allDay: false } : {}),
      ...(field === 'allDay' && value ? { dueTime: '' } : {}),
    }));
  };

  const resetForm = () => {
    setFormState({
      text: '',
      description: '',
      dueDate: '',
      dueTime: '',
      allDay: false,
      priority: 'low',
      recurrence: 'none',
    });
  };

  return { formState, updateField, resetForm };
}


