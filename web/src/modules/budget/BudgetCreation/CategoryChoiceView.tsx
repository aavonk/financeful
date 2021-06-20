import React from 'react';
import MyCategoryList from './MyCategoryList';
import { Container, GridOutter, GridInner } from './style';

//TODO: Note: Maybe put selected categories into context to
// persist state accross each step of the create budget flow,
// rather than putting everything in local storage, parsing it,
// and remembering to delete it.

function CategoryChoice() {
  return (
    <Container>
      <GridOutter>
        <MyCategoryList />
      </GridOutter>
      <GridInner>Inner Area</GridInner>
      <GridOutter>Right Out Area</GridOutter>
    </Container>
  );
}

export default CategoryChoice;
