import React from 'react';
import './TaskInput.css';

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
    <div className="task-input-container">
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
          style={{ color: 'white' }}
        />
        
        <input
          type={allDay ? "date" : "datetime-local"}
          value={allDay ? dueDate.split('T')[0] : dueDate}
          onChange={(e) => {
            if (allDay) {
              setDueDate(e.target.value ? `${e.target.value}T23:59` : '');
            } else {
              setDueDate(e.target.value);
            }
          }}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded min-w-[180px]"
          aria-label="Task due date"
          placeholder={allDay ? "Select date" : "Select date & time"}
          style={{ color: 'white' }}
        />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
          aria-label="Task priority"
          style={{ color: 'white' }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        
        <button
          type="button"
          onClick={addTask}
          className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 whitespace-nowrap font-semibold"
          disabled={!input.trim()}
        >
          Add Task
        </button>
      </div>
      
      {/* Date options row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* All Day checkbox */}
          <label className="flex items-center cursor-pointer text-white">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => {
                setAllDay(e.target.checked);
                if (e.target.checked && dueDate) {
                  const dateOnly = dueDate.split('T')[0];
                  setDueDate(`${dateOnly}T23:59`);
                }
              }}
              className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
            />
            <span className="text-white ml-2">All day task</span>
          </label>
          
          {/* Show current date/time info */}
          {dueDate && (
            <span className="text-gray-400 ml-4 text-sm">
              {allDay ? 'Due end of day' : 'Specific time'}
            </span>
          )}
        </div>
        
        {/* Quick date buttons with better spacing */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => {
              const today = new Date();
              const year = today.getFullYear();
              const month = String(today.getMonth() + 1).padStart(2, '0');
              const day = String(today.getDate()).padStart(2, '0');
              const todayEndOfDay = `${year}-${month}-${day}T23:59`;
              setDueDate(todayEndOfDay);
              setAllDay(false);
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 font-medium"
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
              const tomorrowEndOfDay = `${year}-${month}-${day}T23:59`;
              setDueDate(tomorrowEndOfDay);
              setAllDay(false);
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 font-medium"
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
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 font-medium"
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
