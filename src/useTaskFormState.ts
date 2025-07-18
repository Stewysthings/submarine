import { useState } from 'react';
import type { Task } from './types';

export function useTaskFormState(initialTask?: Partial<Task>) {
    const [formState, setFormState] = useState({
        text: initialTask?.text || '',
        description: initialTask?.description || '',
        dueDate: initialTask?.dueDate
            ? new Date(initialTask.dueDate).toISOString().split('T')[0]
            : '',
        dueTime: initialTask?.dueDate && !initialTask.allDay
            ? initialTask.dueDate.split('T')[1]?.slice(0, 5) || ''
            : '',
        allDay: initialTask?.allDay || false
    });

    const updateField = (field: keyof typeof formState) => (
        value: string | boolean
    ) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormState({
            text: '',
            description: '',
            dueDate: '',
            dueTime: '',
            allDay: false
        });
    };

    return { formState, updateField, resetForm };
}
