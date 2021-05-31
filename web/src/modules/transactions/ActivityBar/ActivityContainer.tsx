import React from 'react';
import Actions from './Actions';
import Task from '@Components/Tasks';
import { ActivityContainerWrapper, TasksContainer } from './style';

function ActivityContainer() {
  return (
    <ActivityContainerWrapper>
      <Actions />
      <TasksContainer>
        <Task
          heading="Review 4 transactions"
          subheading="Ensure your transactions are categorized"
        />
      </TasksContainer>
    </ActivityContainerWrapper>
  );
}

export default ActivityContainer;
