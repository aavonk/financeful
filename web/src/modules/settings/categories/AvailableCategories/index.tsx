import React from 'react';
import GroupList from './GroupList';
import { Title } from './style';

import { DEFAULT_CATEGORIES } from '../defaultCategories';

function AvailableCategories() {
  return (
    <>
      <Title>Income</Title>
      {DEFAULT_CATEGORIES.getIncomeGroup().map((group, index) => (
        <GroupList data={group} key={index} />
      ))}
      <Title isLast>Expenses</Title>
      {DEFAULT_CATEGORIES.getExpenseGroup().map((group, index) => (
        <GroupList data={group} key={index} />
      ))}
    </>
  );
}

export default AvailableCategories;
