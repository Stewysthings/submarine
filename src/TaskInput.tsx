import React from 'react';
import './TaskInput.css'; // Add this import

interface TaskInputProps {
  input: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  allDay: boolean;
  setInput: (value: string) => void;
  setDueDate: (value: string) => void;
  setPriority: (value: 'low' | 'medium' | 'high') => void;
  setAllDay: (value: boolean) => void;
  addTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({
  input,
  dueDate,
  priority,
  allDay,
  setInput,
  setDueDate,
  setPriority,
  setAllDay,
  addTask,
}) => {
  return (
    <div className="task-input-container mb-4">
      {/* Main input row */}
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className="flex-1 p-2 bg-gray-800 text-white border border-gray-600 rounded"
          aria-label="Task description"
        />
        
        <input
          type={allDay ? "date" : "datetime-local"}
          value={allDay ? dueDate.split('T')[0] : dueDate}
          onChange={(e) => {
            if (allDay) {
              setDueDate(e.target.value ? `${e.target.value}T12:00` : '');
            } else {
              setDueDate(e.target.value);
            }
          }}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded min-w-[180px]"
          aria-label="Task due date"
          placeholder={allDay ? "Select date" : "Select date & time"}
        />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
          aria-label="Task priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        
        <button
          type="button"
          onClick={addTask}
          className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 whitespace-nowrap"
          disabled={!input.trim()}
        >
          Add Task
        </button>
      </div>
      
      {/* Date options row - shows immediately when date input is focused or has value */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* All Day checkbox - always visible when there's any date interaction */}
          <label className="flex items-center space-x-2 text-white cursor-pointer">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => {
                console.log('All day checkbox changed:', e.target.checked);
                setAllDay(e.target.checked);
                // If switching to all-day and there's a date, set time to noon
                if (e.target.checked && dueDate) {
                  const dateOnly = dueDate.split('T')[0];
                  setDueDate(`${dateOnly}T12:00`);
                }
              }}
              className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
            />
            <span className="text-sm">All day task</span>
          </label>
          
          {/* Show current date/time info */}
          {dueDate && (
            <span className="text-xs text-gray-400">
              {allDay ? 'Full day task' : 'Specific time'}
            </span>
          )}
        </div>
        
        {/* Quick date buttons */}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => {
              const today = new Date();
              const todayStr = today.toISOString().slice(0, 16);
              setDueDate(todayStr);
              setAllDay(false);
            }}
            className="px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              const tomorrowStr = tomorrow.toISOString().slice(0, 10);
              setDueDate(`${tomorrowStr}T09:00`);
              setAllDay(false);
            }}
            className="px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600"
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
              className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-500"
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
