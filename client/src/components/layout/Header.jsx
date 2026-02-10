import React from 'react';
import MonthNavigator from '../common/MonthNavigator';
import { useExpenses } from '../../hooks/useExpenses';

const Header = () => {
  const { selectedMonth, setSelectedMonth } = useExpenses();

  return (
    <header className="bg-bg-secondary border-b border-gray-800 px-8 py-4">
      <MonthNavigator 
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
    </header>
  );
};

export default Header;