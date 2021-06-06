import React from 'react';
import { Container, Left, Right } from './style';
import { Title } from '../Views/style';
import MyCategories from './MyCategories';
import { List, ListItem } from '@Components/List';

function CategorySetup() {
  return (
    <Container>
      <Left>
        <Title>Available Categories</Title>
      </Left>
      <Right>
        <Title>My Categories</Title>
        <MyCategories />
      </Right>
    </Container>
  );
}

export default CategorySetup;
