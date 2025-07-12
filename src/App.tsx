import { useState } from 'react';
import './App.css';
import type { Task } from './types';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import FilterButtons from './FilterButtons';
import { isOverdue, categorizeTask, categoryLabels } from './Utils';
import { useTaskManager } from './hooks/useTaskManager';
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  if (error) return <div>Error: {error}</div>;
  try {
    return <>{children}</>;
  } catch (err) {
    setError((err as Error).message);
    return <div>Error: {error}</div>;
  }
}

function App() {
  const {
    tasks,
    editingState,
    setEditingState,
    addTask,
    deleteTask,
    toggleTask,
    startEdit,
    saveEdit,
  } = useTaskManager();
  const [category, setCategory] = useState<
    'all' | 'today' | 'thisweek' | 'thismonth' | 'someday'
  >('all');
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');

  const categorizedTasks: Record<string, Task[]> = {
    today: [],
    thisweek: [],
    thismonth: [],
    someday: [],
  };

  tasks
    .filter((task) => !task.completed)
    .forEach((task) => {
      const cat = categorizeTask(task);
      categorizedTasks[cat].push(task);
    });

  const displayedTasks: [string, Task[]][] =
    category === 'all'
      ? Object.entries(categorizedTasks)
      : [[category, categorizedTasks[category] || []]];

  console.log('App is rendering, number of tasks:', tasks.length);

  return (
    <ErrorBoundary>
      <div className="app">
        <h1>To-Do List</h1>
        <p>Test message - App loaded</p>
        <TaskInput
          input={input}
          dueDate={dueDate}
          setInput={setInput}
          setDueDate={setDueDate}
          addTask={() => {
            addTask(input, dueDate);
            setInput('');
            setDueDate('');
          }}
        />
        <FilterButtons category={category} setCategory={setCategory} />
        <TaskList
          displayedTasks={displayedTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEdit={startEdit}
          isOverdue={isOverdue}
          categoryLabels={categoryLabels}
          editingId={editingState.id}
          editText={editingState.text}
          editDueDate={editingState.dueDate}
          setEditText={(text) => setEditingState({ ...editingState, text })}
          setEditDueDate={(dueDate) => setEditingState({ ...editingState, dueDate })}
          saveEdit={saveEdit} cancelEdit={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      </div>
    </ErrorBoundary>
  );
}

export default App;