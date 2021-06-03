import React from 'react';
import type { Transaction } from '@Generated/graphql';
import type { Action } from '../transactionsPageReducer';

type Props = {
  dispatch: React.Dispatch<Action>;
};

function ReviewView() {
  return <div>Test from Review View!!!</div>;
}

export default ReviewView;
