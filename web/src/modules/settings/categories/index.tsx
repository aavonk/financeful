import React from 'react';
import { Container, Left, Right } from './style';
import { Title } from '../Views/style';
import MyCategories from './MyCategories/MyCategories';
import AvailableCategories from './AvailableCategories';

function CategorySetup() {
  return (
    <Container>
      <Left>
        <Title>Available Categories</Title>
        <AvailableCategories />
      </Left>
      <Right>
        <Title>My Categories</Title>
        <MyCategories />
      </Right>
    </Container>
  );
}

export default CategorySetup;