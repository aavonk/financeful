import React from 'react';
import MyCategoryList from '../MyCategoryList';
import SelectedCategoryList from '../SelectedCategoryList';
import CategoryControls from '../CategoryControls';
import { Container, GridOutter, GridInner } from '../style';
import { useMediaQuery } from '@Hooks/useMediaQuery';

function CategoryChoiceView() {
  // Media query from theme-- device.tabletAndDown Property
  const isMobileDevice = useMediaQuery('(max-width: 768px)');
  const mobileDisplay = (
    <>
      <GridInner>
        <CategoryControls />
      </GridInner>
      <GridOutter>
        <MyCategoryList />
      </GridOutter>
    </>
  );
  return (
    <Container>
      {isMobileDevice ? (
        mobileDisplay
      ) : (
        <>
          <GridOutter>
            <MyCategoryList />
          </GridOutter>
          <GridInner>
            <CategoryControls />
          </GridInner>
          <GridOutter>
            <SelectedCategoryList />
          </GridOutter>
        </>
      )}
    </Container>
  );
}

export default CategoryChoiceView;
