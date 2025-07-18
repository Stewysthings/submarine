
import React from 'react';
import './TaskInput.css';

interface TaskInputProps {
  input: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  allDay: boolean;
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly'; // New prop
  setInput: (value: string) => void;
  setDueDate: (value: string) => void;
  setPriority: (value: 'low' | 'medium' | 'high') => void;
  setAllDay: (value: boolean) => void;
  setRecurrence: (value: 'none' | 'daily' | 'weekly' | 'monthly') => void; // New prop
  addTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({
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
}) => {
  // Helper to format dueDate for display
  const formatDisplayDate = (date: string, allDay: boolean) => {
    if (!date) return 'No date set';
    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) return 'Invalid date';
      return allDay
        ? date.split('T')[0]
        : parsedDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });
    } catch {
      return 'Invalid date';
    }
  };

  // Helper to format priority for display
  const formatPriority = (priority: 'low' | 'medium' | 'high') => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  // Helper to format recurrence for display
  const formatRecurrence = (recurrence: 'none' | 'daily' | 'weekly' | 'monthly') => {
    return recurrence.charAt(0).toUpperCase() + recurrence.slice(1);
  };

  return (
    <div className="task-input-container">
      {/* Main input row */}
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded"
          aria-label="Task description"
          style={{ color: 'black' }}
          data-testid="task-input-text"
        />
        
        <div className="flex items-center space-x-2">
          <input
            key={allDay ? 'date' : 'datetime-local'}
            type={allDay ? 'date' : 'datetime-local'}
            value={
              dueDate && !isNaN(new Date(dueDate).getTime())
                ? allDay
                  ? dueDate.split('T')[0]
                  : dueDate.slice(0, 16)
                : ''
            }
            onChange={(e) => {
              console.log('Date input changed:', e.target.value, 'allDay:', allDay);
              if (allDay) {
                setDueDate(e.target.value ? `${e.target.value}T23:59:59` : '');
              } else {
                setDueDate(e.target.value);
              }
            }}
            className="p-2 bg-gray-800 text-white border border-gray-600 rounded min-w-[180px] focus:border-cyan-500"
            aria-label="Task due date"
            placeholder={allDay ? 'Select date' : 'Select date & time'}
            style={{ color: 'white', opacity: 1, '::placeholder': { color: '#9ca3af' } }}
            data-testid="task-input-date"
          />
          {dueDate && (
            <span className="text-gray-400 text-sm" data-testid="task-date-display">
              {formatDisplayDate(dueDate, allDay)}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-white text-sm" htmlFor="task-priority">
            Priority
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => {
              console.log('Priority changed:', e.target.value);
              setPriority(e.target.value as 'low' | 'medium' | 'high');
            }}
            className="p-2 bg-gray-800 text-white border border-gray-600 rounded min-w-[100px] focus:border-cyan-500"
            aria-label="Task priority"
            style={{ color: 'white', backgroundColor: '#1f2937', opacity: 1 }}
            data-testid="task-input-priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <span className="text-gray-400 text-sm" data-testid="task-priority-display">
            {formatPriority(priority)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-white text-sm" htmlFor="task-recurrence">
            Recurrence
          </label>
          <select
            id="task-recurrence"
            value={recurrence}
            onChange={(e) => {
              console.log('Recurrence changed:', e.target.value);
              setRecurrence(e.target.value as 'none' | 'daily' | 'weekly' | 'monthly');
            }}
            className="p-2 bg-gray-800 text-white border border-gray-600 rounded min-w-[100px] focus:border-cyan-500"
            aria-label="Task recurrence"
            style={{ color: 'white', backgroundColor: '#1f2937', opacity: 1 }}
            data-testid="task-input-recurrence"
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <span className="text-gray-400 text-sm" data-testid="task-recurrence-display">
            {formatRecurrence(recurrence)}
          </span>
        </div>
        
        <button
          type="button"
          onClick={addTask}
          className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 whitespace-nowrap font-semibold"
          disabled={!input.trim()}
          data-testid="task-input-submit"
        >
          Add Task
        </button>
      </div>
      
      {/* Date options row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer text-white">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => {
                const isAllDay = e.target.checked;
                console.log('All day toggled:', isAllDay, 'dueDate:', dueDate);
                setAllDay(isAllDay);
                if (isAllDay && dueDate) {
                  const dateOnly = dueDate.split('T')[0];
                  setDueDate(`${dateOnly}T23:59:59`);
                } else if (!isAllDay && dueDate) {
                  const dateOnly = dueDate.split('T')[0];
                  const now = new Date();
                  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                  setDueDate(`${dateOnly}T${time}`);
                }
              }}
              className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
              data-testid="task-input-allday"
            />
            <span className="text-white ml-2">All day task</span>
          </label>
          
          {dueDate && (
            <span className="text-gray-400 ml-4 text-sm" data-testid="task-date-info">
              {allDay ? 'Due end of day' : 'Specific time'}
            </span>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => {
              const today = new Date();
              const year = today.getFullYear();
              const month = String(today.getMonth() + 1).padStart(2, '0');
              const day = String(today.getDate()).padStart(2, '0');
              const todayEndOfDay = `${year}-${month}-${day}T23:59:59`;
              setDueDate(todayEndOfDay);
              setAllDay(true);
              console.log('Today set:', todayEndOfDay);
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 font-medium"
            data-testid="task-input-today"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              const year = tomorrow.getFullYear();
              const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
              const day = String(tomorrow.getDate()).padStart(2, '0');
              const tomorrowEndOfDay = `${year}-${month}-${day}T23:59:59`;
              setDueDate(tomorrowEndOfDay);
              setAllDay(true);
              console.log('Tomorrow set:', tomorrowEndOfDay);
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 font-medium"
            data-testid="task-input-tomorrow"
          >
            Tomorrow
          </button>
          {dueDate && (
            <button
              type="button"
              onClick={() => {
                setDueDate('');
                setAllDay(false);
                console.log('Date cleared');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 font-medium"
              data-testid="task-input-clear"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskInput;