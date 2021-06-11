import React from 'react';
import styled from 'styled-components';
import GroupList from './GroupList';

import { DEFAULT_CATEGORIES } from '../defaultCategories';

function AvailableCategories() {
  return (
    <Container>
      {DEFAULT_CATEGORIES.getIncomeGroup().map((group, index) => (
        <GroupList data={group} key={index} />
      ))}
    </Container>
  );
}

export default AvailableCategories;

export const Container = styled.div``;
