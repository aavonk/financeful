import React from 'react';
import { Heading, Section } from './style';
import CategorySetup from '../CategorySetup';

function Categories() {
  return (
    <>
      <Heading>
        <h2>Categories</h2>
      </Heading>
      <Section>
        <CategorySetup />
      </Section>
    </>
  );
}

export default Categories;
