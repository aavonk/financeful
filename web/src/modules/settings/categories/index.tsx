import React from 'react';
import { Container, Left, Right } from './style';
import { SectionTitle } from '@Components/Layout/styles';
import MyCategories from './MyCategories';
import AvailableCategories from './AvailableCategories';

function CategorySetup() {
  return (
    <Container>
      <Left>
        <SectionTitle variant={2}>Available Categories</SectionTitle>
        <AvailableCategories />
      </Left>
      <Right>
        <SectionTitle variant={2}>My Categories</SectionTitle>
        <MyCategories />
      </Right>
    </Container>
  );
}

export default CategorySetup;
