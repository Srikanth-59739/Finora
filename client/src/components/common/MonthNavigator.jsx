import React, { useRef, useEffect } from 'react';
import { formatMonthDisplay, getPreviousMonth, getNextMonth, getCurrentMonth } from '../../utils/dateHelpers';

const MonthNavigator = ({ selectedMonth, onMonthChange, availableMonths = [] }) => {
  const scrollRef = useRef(null);

  // Generate months (6 months back from current)
  const generateMonths = () => {
    const months = [];
    let current = getCurrentMonth();
    
    for (let i = 0; i < 12; i++) {
      months.push(current);
      current = getPreviousMonth(current);
    }
    
    return months.reverse();
  };

  const months = generateMonths();

  // Scroll to selected month on mount
  useEffect(() => {
    if (scrollRef.current) {
      const selectedIndex = months.indexOf(selectedMonth);
      const monthElement = scrollRef.current.children[selectedIndex];
      
      if (monthElement) {
        monthElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, []);

  const handlePrevious = () => {
    const prevMonth = getPreviousMonth(selectedMonth);
    if (months.includes(prevMonth)) {
      onMonthChange(prevMonth);
    }
  };

  const handleNext = () => {
    const current = getCurrentMonth();
    if (selectedMonth !== current) {
      const nextMonth = getNextMonth(selectedMonth);
      onMonthChange(nextMonth);
    }
  };

  return (
    <div className="month-nav-glass rounded-card p-4 flex items-center gap-4">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="text-text-secondary hover:text-accent-mint transition-colors p-2 hover:bg-bg-tertiary rounded-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Month Selector */}
      <div 
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-snap-x flex-1 py-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {months.map((month) => {
          const isSelected = month === selectedMonth;
          const isCurrent = month === getCurrentMonth();
          
          return (
            <button
              key={month}
              onClick={() => onMonthChange(month)}
              className={`
                scroll-snap-item px-6 py-2 rounded-lg whitespace-nowrap font-medium transition-all duration-200
                ${isSelected 
                  ? 'bg-accent-mint text-bg-primary shadow-lg scale-105' 
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-gray-700'
                }
                ${isCurrent && !isSelected ? 'border border-accent-mint' : ''}
              `}
            >
              {formatMonthDisplay(month)}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={selectedMonth === getCurrentMonth()}
        className="text-text-secondary hover:text-accent-mint transition-colors p-2 hover:bg-bg-tertiary rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default MonthNavigator;