
import React from 'react';
import { FormInput } from './FormInput';
import './TaskInput.css';

interface TaskInputProps {
  input: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  allDay: boolean;
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly';
  setInput: (value: string) => void;
  setDueDate: (value: string) => void;
  setPriority: (value: 'low' | 'medium' | 'high') => void;
  setAllDay: (value: boolean) => void;
  setRecurrence: (value: 'none' | 'daily' | 'weekly' | 'monthly') => void;
  addTask: () => void;
}

export default function TaskInput({
  input,
  dueDate,
  priority,
  allDay,
  recurrence,
  setInput,
  setDueDate,
  setPriority,
  setAllDay,
  setRecurrence,
  addTask,
}: TaskInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask();
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <FormInput
        label="Task"
        id="task"
        type="text"
        value={input}
        onChange={setInput}
        placeholder="Add a new task..."
        required
      />

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <div className="flex items-center gap-2">
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="date-picker"
          />
          <button
            type="button"
            onClick={() => {
              const today = new Date();
              setDueDate(today.toISOString().split('T')[0]);
              setAllDay(true);
            }}
            className="form-button"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              setDueDate(tomorrow.toISOString().split('T')[0]);
              setAllDay(true);
            }}
            className="form-button"
          >
            Tomorrow
          </button>
          {dueDate && (
            <button
              type="button"
              onClick={() => {
                setDueDate('');
                setAllDay(false);
              }}
              className="form-button clear-button"
            >
              Clear
            </button>
          )}
        </div>
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
            value={dueDate.split('T')[1]?.slice(0, 5) || ''}
            onChange={(e) => {
              const time = e.target.value;
              setDueDate(time ? `${dueDate.split('T')[0]}T${time}` : dueDate);
            }}
            className="date-picker"
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="priority-selector"
          aria-label="Task priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="recurrence">Recurrence</label>
        <select
          id="recurrence"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value as 'none' | 'daily' | 'weekly' | 'monthly')}
          className="recurrence-selector"
          aria-label="Task recurrence"
        >
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <button type="submit" disabled={!input.trim()} className="add-button">
        Add Task
      </button>
    </form>
  );
}
export default TaskInput;