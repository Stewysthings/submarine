import React from 'react';

interface FilterButtonsProps {
  category: 'all' | 'today' | 'thisweek' | 'thismonth' | 'someday' | 'overdue' | 'dueSoon';
  setCategory: (value: 'all' | 'today' | 'thisweek' | 'thismonth' | 'someday' | 'overdue' | 'dueSoon') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ category, setCategory }) => {
  return (
    <div className="filter-buttons">
      <button
        onClick={() => setCategory('all')}
        className={category === 'all' ? 'active' : ''}
        aria-pressed={category === 'all'}
        aria-label="Filter by all tasks"
      >
        All
      </button>
      <button
        onClick={() => setCategory('overdue')}
        className={category === 'overdue' ? 'active' : ''}
        aria-pressed={category === 'overdue'}
        aria-label="Filter by overdue tasks"
      >
        Overdue
      </button>
      <button
        onClick={() => setCategory('dueSoon')}
        className={category === 'dueSoon' ? 'active' : ''}
        aria-pressed={category === 'dueSoon'}
        aria-label="Filter by tasks due soon"
      >
        Due Soon
      </button>
      <button
        onClick={() => setCategory('today')}
        className={category === 'today' ? 'active' : ''}
        aria-pressed={category === 'today'}
        aria-label="Filter by tasks due today"
      >
        Today
      </button>
      <button
        onClick={() => setCategory('thisweek')}
        className={category === 'thisweek' ? 'active' : ''}
        aria-pressed={category === 'thisweek'}
        aria-label="Filter by tasks due this week"
      >
        This Week
      </button>
      <button
        onClick={() => setCategory('thismonth')}
        className={category === 'thismonth' ? 'active' : ''}
        aria-pressed={category === 'thismonth'}
        aria-label="Filter by tasks due this month"
      >
        This Month
      </button>
      <button
        onClick={() => setCategory('someday')}
        className={category === 'someday' ? 'active' : ''}
        aria-pressed={category === 'someday'}
        aria-label="Filter by tasks with no due date"
      >
        Someday
      </button>
    </div>
  );
};

export default FilterButtons;