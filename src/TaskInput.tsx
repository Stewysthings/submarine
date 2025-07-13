interface TaskInputProps {
  input: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  setInput: (value: string) => void;
  setDueDate: (value: string) => void;
  setPriority: (value: 'low' | 'medium' | 'high') => void;
  addTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({
  input,
  dueDate,
  priority,
  setInput,
  setDueDate,
  setPriority,
  addTask,
}) => {
  return (
    <div className="flex space-x-2 mb-4">
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
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
        aria-label="Task due date"
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
        className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;