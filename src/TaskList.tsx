import React from 'react';
import type { Task } from './types';

interface TaskListProps {
  displayedTasks: [string, Task[]][];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  startEdit: (id: number, text: string, dueDate?: string) => void;
  isOverdue: (dueDate?: string) => boolean;
  categoryLabels: Record<string, string>;
  editingId: number | null;
  editText: string;
  editDueDate: string;
  setEditText: (text: string) => void;
  setEditDueDate: (date: string) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
}
function formatDueDate(dueDate?: string): string {
  if (!dueDate) return '';
  const date = new Date(dueDate); // browser parses "YYYY-MM-DDTHH:MM"
  return date.toLocaleString([], {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

const TaskList: React.FC<TaskListProps> = ({
  displayedTasks,
  toggleTask,
  deleteTask,
  startEdit,
  isOverdue,
  categoryLabels,
  editingId,
  editText,
  editDueDate,
  setEditText,
  setEditDueDate,
  saveEdit,
  cancelEdit,
}) => {
  return (
    <>
      {displayedTasks.some(([_, tasks]) => tasks.length > 0) ? (
        displayedTasks.map(([cat, tasks]) => (
          <div key={cat} className="category-section">
            <h2>{categoryLabels[cat] || cat}</h2>
            <ul className="task-list">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`task-item ${
                    task.dueDate && isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  {editingId === task.id ? (
                <div className="edit-container" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') saveEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    onBlur={saveEdit}
                    className="edit-input"
                    autoFocus
                  />
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Prevent parent click events
                    className="date-picker"
                    autoFocus={false} // Avoid stealing focus from text input initially
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <span
                    className={`task-text ${isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}`}
                    onDoubleClick={() => startEdit(task.id, task.text, task.dueDate)}
                >
                  {task.text} {task.dueDate && `(${formatDueDate(task.dueDate)})`}

                </span>
                  )}
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No tasks found</p>
      )}
    </>
  );
};

export default TaskList;