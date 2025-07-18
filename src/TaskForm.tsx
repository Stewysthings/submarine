
import React from 'react';
import type { Task } from './types';
import { FormInput } from './FormInput';
import { useTaskFormState } from './useTaskFormState';
import './ButtonStyles.css';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  initialTask?: Partial<Task>;
}

const DEFAULT_MORNING_TIME = '09:00:00';
const DEFAULT_NOON_TIME = '12:00:00';

export function TaskForm({ onSubmit, initialTask }: TaskFormProps) {
  const { formState, updateField, resetForm } = useTaskFormState(initialTask);
  const { text, description, dueDate, dueTime, allDay } = formState;

  const createDueDateString = (date: string, time: string, isAllDay: boolean): string => {
    if (!date) return '';

    if (isAllDay) {
      return `${date}T${DEFAULT_NOON_TIME}`;
    }
    return `${date}T${time ? `${time}:00` : DEFAULT_MORNING_TIME}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dueDateString = createDueDateString(dueDate, dueTime, allDay);

    onSubmit({
      text,
      description,
      dueDate: dueDateString || undefined,
      allDay,
      completed: initialTask?.completed || false,
      priority: initialTask?.priority || 'low', // Add default priority
    });

    resetForm();
  };

  return (
      <form onSubmit={handleSubmit} className="task-form">
        <FormInput
            label="Task Text *"
            id="text"
            type="text"
            value={text}
            onChange={updateField('text')}
            required
            placeholder="Enter task text"
        />

        <FormInput
            label="Description"
            id="description"
            type="textarea"
            value={description}
            onChange={updateField('description')}
            placeholder="Enter task description (optional)"
            rows={3}
        />

        <FormInput
            label="Due Date"
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={updateField('dueDate')}
        />

        {dueDate && (
            <div className="form-group">
              <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={allDay}
                    onChange={(e) => updateField('allDay')(e.target.checked)}
                />
                All day task
              </label>
            </div>
        )}

        {dueDate && !allDay && (
            <FormInput
                label="Due Time"
                id="dueTime"
                type="time"
                value={dueTime}
                onChange={updateField('dueTime')}
                placeholder="Optional"
            />
        )}

        <button type="submit" className="add-button" disabled={!text.trim()}>
          {initialTask ? 'Update Task' : 'Add Task'}
        </button>
      </form>
  );
}