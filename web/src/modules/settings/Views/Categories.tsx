import React from 'react';
import { Section } from './style';
import { SectionTitle } from '@Components/Layout/styles';
import CategorySetup from '../categories';
import CreateCategoryController from '../categories/Forms/CreateCategoryController';

function Categories() {
  return (
    <>
      <SectionTitle as="h5">Categories</SectionTitle>
      <Section>
        <CreateCategoryController />
        <CategorySetup />
      </Section>
    </>
  );
}

export default Categories;
