import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGetUncategorizedLengthQuery } from '@Generated/graphql';
import Task from '@Components/Tasks';

function ReviewTransactionsTask() {
  const { data, loading, error } = useGetUncategorizedLengthQuery();
  const [heading, setHeading] = React.useState<string>('');
  const [subheading, setSubheading] = React.useState<string>('');
  const [isClickable, setIsClickable] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    setHeading(`Review ${data?.getUncategorizedLength || ''} transactions`);
  }, [data]);

  React.useEffect(() => {
    const value = data?.getUncategorizedLength;

    if (value && value > 0) {
      setIsClickable(true);

      return setSubheading('Make sure your transactions are properly categorized');
    }
    setIsClickable(false);
    setSubheading("When you have transactions to review, you'll see them here");
  }, [data]);

  if (error) {
    return null;
  }

  return (
    <>
      <Task
        heading={heading}
        subheading={subheading}
        loading={loading}
        isClickable={isClickable}
        onClick={() => {
          history.push('/transactions/uncategorized');
        }}
      />
    </>
  );
}

export default ReviewTransactionsTask;
