import type { Dispatch, SetStateAction } from 'react';
import { categoryLabels } from './utils';

interface FilterButtonsProps {
  category: 'all' | 'today' | 'thisweek' | 'thismonth' | 'someday' | 'overdue' | 'dueSoon';
  setCategory: Dispatch<
    SetStateAction<'all' | 'today' | 'thisweek' | 'thismonth' | 'someday' | 'overdue' | 'dueSoon'>
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
  ];

  return (
    <div className="filter-buttons">
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