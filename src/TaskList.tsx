import React from 'react';
import type { Task } from './types';
import type { TaskListProps } from './TaskListProps';

function formatDueDate(dueDate?: string, allDay?: boolean): string {
  if (!dueDate) return '';
  const date = new Date(dueDate);

  if (allDay) {
    return date.toLocaleDateString([], {
      dateStyle: 'short',
    });
  }

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
  isDueSoon,
  categoryLabels,
  editingId,
  editText,
  editDueDate,
  editPriority,
  editAllDay,
  editRecurrence,
  setEditText,
  setEditDueDate,
  setEditPriority,
  setEditAllDay,
  setEditRecurrence,
  saveEdit,
  cancelEdit,
  activeCategory,
  onCategoryChange,
}) => {
  if (!displayedTasks || !Array.isArray(displayedTasks)) {
    return <p className="no-tasks">No tasks available</p>;
  }

  return (
    <div className="task-list-container">
      {displayedTasks.length > 0 ? (
        displayedTasks.map(([cat, tasks]) => (
          <div key={cat} className="category-section">
            <h2 className="category-heading">{categoryLabels[cat] || cat}</h2>
            <ul className="task-list">
              {tasks.map((task) => {
                const statusClass = !task.completed
                  ? isOverdue(task.dueDate, task.completed, task.allDay)
                    ? 'overdue'
                    : isDueSoon(task.dueDate, task.allDay)
                      ? 'due-soon'
                      : `priority-${task.priority}`
                  : 'completed';
                return (
                  <li
                    key={task.id}
                    className={`task-item ${statusClass} ${task.recurrence !== 'none' ? 'recurring' : ''}`}
                    aria-label={`Task: ${task.text}, ${isOverdue(task.dueDate, task.completed, task.allDay) && !task.completed ? 'Overdue' : isDueSoon(task.dueDate, task.allDay) && !task.completed ? 'Due soon' : task.completed ? 'Completed' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                      aria-checked={task.completed}
                    />
                    {editingId === task.id ? (
                      <div className="edit-container" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(task.id);
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          className="edit-input"
                          placeholder="Update task description"
                          autoFocus
                          aria-label="Edit task description"
                        />
                        <input
                          type={editAllDay ? 'date' : 'datetime-local'}
                          value={
                            editDueDate && !isNaN(new Date(editDueDate).getTime())
                              ? editAllDay
                                ? editDueDate.split('T')[0]
                                : editDueDate.slice(0, 16)
                              : ''
                          }
                          onChange={(e) => {
                            console.log('Edit due date changed:', e.target.value);
                            if (editAllDay) {
                              setEditDueDate(e.target.value ? `${e.target.value}T23:59:59` : '');
                            } else {
                              setEditDueDate(e.target.value);
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="date-picker"
                          aria-label="Edit due date"
                        />
                        <select
                          value={editPriority}
                          onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                          onClick={(e) => e.stopPropagation()}
                          className="priority-selector"
                          aria-label="Edit priority"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                        <select
                          value={editRecurrence}
                          onChange={(e) => {
                            console.log('Edit recurrence changed:', e.target.value);
                            setEditRecurrence(e.target.value as 'none' | 'daily' | 'weekly' | 'monthly');
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="recurrence-selector"
                          aria-label="Edit recurrence"
                        >
                          <option value="none">None</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                        <div className="checkbox-container">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={editAllDay}
                              onChange={(e) => {
                                const isAllDay = e.target.checked;
                                console.log('Edit all day toggled:', isAllDay);
                                setEditAllDay(isAllDay);
                                if (isAllDay && editDueDate) {
                                  const dateOnly = editDueDate.split('T')[0];
                                  setEditDueDate(`${dateOnly}T23:59:59`);
                                } else if (!isAllDay && editDueDate) {
                                  const dateOnly = editDueDate.split('T')[0];
                                  const now = new Date();
                                  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                                  setEditDueDate(`${dateOnly}T${time}`);
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="edit-checkbox"
                              aria-label="All day task"
                            />
                            All day task
                          </label>
                        </div>
                        <div className="edit-actions">
                          <button
                            type="button"
                            onClick={() => saveEdit(task.id)}
                            className="save-button"
                            aria-label="Save task"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="cancel-button"
                            aria-label="Cancel edit"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span
                          className={`task-text ${statusClass}`}
                          onDoubleClick={() => startEdit(task.id, task.text, task.dueDate || '', task.priority, task.allDay, task.recurrence)}
                        >
                          {task.text} {task.dueDate && `(${formatDueDate(task.dueDate, task.allDay)})`}
                        </span>
                        <span className={`priority-label ${task.priority ? task.priority.toLowerCase() : 'low'}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        {task.recurrence !== 'none' && (
                          <span className="recurrence-label">
                            Repeats: {task.recurrence.charAt(0).toUpperCase() + task.recurrence.slice(1)}
                          </span>
                        )}
                        <div className="task-actions">
                          <button
                            type="button"
                            onClick={() => startEdit(task.id, task.text, task.dueDate || '', task.priority, task.allDay, task.recurrence)}
                            className="edit-button"
                            aria-label={`Edit task ${task.text}`}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            className="delete-button"
                            aria-label={`Delete task ${task.text}`}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      ) : (
        <p className="no-tasks">No tasks found</p>
      )}
    </div>
  );
};

export default TaskList;

