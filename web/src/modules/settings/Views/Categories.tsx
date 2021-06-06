import React from 'react';
import { Heading, Section } from './style';
import CategorySetup from '../CategorySetup';
import CreateCategoryController from '../CategorySetup/Forms/CreateCategoryController';

function Categories() {
  return (
    <>
      <Heading>
        <h2>Categories</h2>
      </Heading>
      <Section>
        <CreateCategoryController />
        <CategorySetup />
      </Section>
    </>
  );
}

export default Categories;
