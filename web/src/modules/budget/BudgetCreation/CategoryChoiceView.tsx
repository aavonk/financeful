import React from 'react';
import MyCategoryList from './MyCategoryList';
import SelectedCategories from './SelectedCategories';
import CategoryControls from './CategoryControls';
import { Container, GridOutter, GridInner } from './style';

function CategoryChoiceView() {
  return (
    <Container>
      <GridOutter>
        <MyCategoryList />
      </GridOutter>
      <GridInner>
        <CategoryControls />
      </GridInner>
      <GridOutter>
        <SelectedCategories />
      </GridOutter>
    </Container>
  );
}

export default CategoryChoiceView;
