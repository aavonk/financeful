import React from 'react';
import { useQuery } from '@Hooks/useQuery';
import { SectionTitle } from '@Components/Layout/styles';

// Get Stepper component from https://bit.dev/mui-org/material-ui/stepper?example=5e985f60d7cc950019da6274

function CreateBudgetPage() {
  const query = useQuery();
  const month = query.get('month');
  const year = query.get('year');
  return (
    <>
      <SectionTitle as="h2">{`${month} Budget`}</SectionTitle>
      <p>Steps</p>
      <ol>
        <li>Choose Categories</li>
        <li>Set budget amounts</li>
        <li>Review & Save</li>
      </ol>
    </>
  );
}

export default CreateBudgetPage;
