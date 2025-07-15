import React, { useState } from 'react';
import type { Task } from './types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  initialTask?: Partial<Task>;
}

export function TaskForm({ onSubmit, initialTask }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate ? initialTask.dueDate.split('T')[0] : ''
  );
  const [dueTime, setDueTime] = useState(
    initialTask?.dueDate && !initialTask.allDay 
      ? initialTask.dueDate.split('T')[1]?.slice(0, 5) || ''
      : ''
  );
  const [allDay, setAllDay] = useState(initialTask?.allDay || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let dueDateString = '';
    if (dueDate) {
      if (allDay) {
        // For all-day tasks, set to noon to avoid timezone issues
        dueDateString = `${dueDate}T12:00:00`;
      } else if (dueTime) {
        dueDateString = `${dueDate}T${dueTime}:00`;
      } else {
        // If no time specified but not all-day, default to 9 AM
        dueDateString = `${dueDate}T09:00:00`;
      }
    }

    onSubmit({
      title,
      description,
      dueDate: dueDateString || undefined,
      allDay,
      completed: initialTask?.completed || false,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
    setAllDay(false);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {dueDate && (
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
            />
            All day task
          </label>
        </div>
      )}

      {dueDate && !allDay && (
        <div className="form-group">
          <label htmlFor="dueTime">Due Time</label>
          <input
            id="dueTime"
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            placeholder="Optional"
          />
        </div>
      )}

      <button type="submit" disabled={!title.trim()}>
        {initialTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
