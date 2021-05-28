import React from 'react';
import Actions from './Actions';
import Task from '@Components/Tasks';
import { ActivityContainerWrapper, TasksContainer } from './style';

function ActivityContainer() {
  return (
    <ActivityContainerWrapper>
      <Actions />
      <TasksContainer>
        <Task />
      </TasksContainer>
    </ActivityContainerWrapper>
  );
}

export default ActivityContainer;
