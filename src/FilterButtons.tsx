import React from 'react';

interface FilterButtonsProps {
  category: 'all' | 'today' | 'thisweek' | 'thismonth' | 'someday';
  setCategory: (value: 'all' | 'today' | 'thisweek' | 'thismonth' | 'someday') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ category, setCategory }) => {
  return (
    <div className="filter-buttons">
      <button
        onClick={() => setCategory('all')}
        className={category === 'all' ? 'active' : ''}
      >
        All
      </button>
      <button
        onClick={() => setCategory('today')}
        className={category === 'today' ? 'active' : ''}
      >
        Today
      </button>
      <button
        onClick={() => setCategory('thisweek')}
        className={category === 'thisweek' ? 'active' : ''}
      >
        This Week
      </button>
      <button
        onClick={() => setCategory('thismonth')}
        className={category === 'thismonth' ? 'active' : ''}
      >
        This Month
      </button>
      <button
        onClick={() => setCategory('someday')}
        className={category === 'someday' ? 'active' : ''}
      >
        Someday
      </button>
    </div>
  );
};

export default FilterButtons;