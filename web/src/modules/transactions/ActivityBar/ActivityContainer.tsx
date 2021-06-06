import React from 'react';
import Actions from './Actions';
import { ActivityContainerWrapper, TasksContainer, ReceiptContainer } from './style';
import TaskList from './TaskList/TaskList';
import Receipt from './SummaryReceipt/Receipt';

type Props = {
  disableSearch?: boolean;
  disableButton?: boolean;
};

function ActivityContainer({ disableSearch, disableButton }: Props) {
  return (
    <ActivityContainerWrapper>
      <Actions disableSearch={disableSearch} disableButton={disableButton} />
      <TasksContainer>
        <TaskList />
      </TasksContainer>
      <ReceiptContainer>
        <Receipt />
      </ReceiptContainer>
    </ActivityContainerWrapper>
  );
}

export default ActivityContainer;
