import { useState, useMemo } from 'react';
import './App.css';
import type { Task } from './types';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import FilterButtons from './FilterButtons';
import { isOverdue, categorizeTask, categoryLabels } from './Utils';
import { useTaskManager } from './hooks/useTaskManager';
import React from 'react';

// ✅ Proper ErrorBoundary using a class component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: string | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({ error: error.message });
  }

  render() {
    if (this.state.error) return <div>Error: {this.state.error}</div>;
    return this.props.children;
  }
}

function App() {
  // 🧠 Custom task logic handled by your custom hook
  const {
    tasks,
    editingState,
    setEditingState,
    addTask,
    deleteTask,
    toggleTask,
    startEdit,
    saveEdit,
    removingId,
  } = useTaskManager();

  const [category, setCategory] = useState<'all' | 'today' | 'thisweek' | 'thismonth' | 'someday'>('all');
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');

  // 🧮 Memoize categorized tasks for performance
  const categorizedTasks = useMemo(() => {
    const categories: Record<string, Task[]> = {
      dueSoon: [],
      today: [],
      thisweek: [],
      thismonth: [],
      someday: [],
    };
    tasks
      .filter((task) => !task.completed)
      .forEach((task) => {
        const cat = categorizeTask(task);
        categories[cat].push(task);
      });
    return categories;
  }, [tasks]);

  // 🎯 Decide which tasks to show based on selected category
  const displayedTasks: [string, Task[]][] =
    category === 'all'
      ? Object.entries(categorizedTasks)
      : [[category, categorizedTasks[category] || []]];

  console.log('App is rendering, number of tasks:', tasks.length);

  return (
    <ErrorBoundary>
      <div className="app">
        <h1>To-Do List</h1>
        <p>Submarine is surfacing…</p>

        {/* 📝 Task input form */}
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

        {/* 🔘 Filter controls */}
        <FilterButtons category={category} setCategory={setCategory} />

        {/* 📋 Display the categorized tasks */}
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
          saveEdit={saveEdit}

          // ✅ Cancel edit resets editing state instead of throwing error
          cancelEdit={() => setEditingState({ id: null, text: '', dueDate: '' })}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;