import React from 'react';
import { Heading, Section } from './style';
import CategorySetup from '../categories';
import CreateCategoryController from '../categories/Forms/CreateCategoryController';

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
