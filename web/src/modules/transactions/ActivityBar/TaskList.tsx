import React from 'react';
import Task from '@Components/Tasks';
import { useGetUncategorizedLengthQuery } from '@Generated/graphql';

function TaskList() {
  const { data, loading, error } = useGetUncategorizedLengthQuery();

  if (error) {
    return null;
  }

  return (
    <>
      <Task
        heading={`Review ${data?.getUncategorizedLength} transactions`}
        subheading="Ensure your transactions are categorized"
        loading={loading}
        onClick={() => console.log('hi')}
      />
    </>
  );
}

export default TaskList;
