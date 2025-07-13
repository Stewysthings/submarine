import type { Dispatch, SetStateAction } from 'react';
import { categoryLabels } from './utils';

interface FilterButtonsProps {
  category: 'all' | 'today' | 'thisweek' | 'thismonth' | 'someday' | 'overdue' | 'dueSoon' | 'completed';
  setCategory: Dispatch<
    SetStateAction<'all' | 'today' | 'thisweek' | 'thismonth' | 'someday' | 'overdue' | 'dueSoon' | 'completed'>
  >;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ category, setCategory }) => {
  const categories: FilterButtonsProps['category'][] = [
    'all',
    'overdue',
    'dueSoon',
    'today',
    'thisweek',
    'thismonth',
    'someday',
    'completed',
  ];

  return (
    <div className="filter-buttons">
      <span className="filter-label">Filter tasks: </span>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={cat === category ? 'active' : ''}
          onClick={() => setCategory(cat)}
          aria-pressed={cat === category}
        >
          {categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;