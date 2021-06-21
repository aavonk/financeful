import React from 'react';
import Button from '@Common/Button';
import { ControlsContainer } from './style';

function CategoryControls() {
  return (
    <ControlsContainer>
      <Button variant="dark" onClick={() => console.log('move')}>
        Move
      </Button>
    </ControlsContainer>
  );
}

export default CategoryControls;
