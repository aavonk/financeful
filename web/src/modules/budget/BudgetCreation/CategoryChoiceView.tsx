import React from 'react';
import MyCategoryList from './MyCategoryList';
import SelectedCategoryList from './SelectedCategoryList';
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
        <SelectedCategoryList />
      </GridOutter>
    </Container>
  );
}

export default CategoryChoiceView;
