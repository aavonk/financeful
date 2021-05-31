import React from 'react';
import Actions from './Actions';
import { ActivityContainerWrapper, TasksContainer } from './style';
import TaskList from './TaskList';

function ActivityContainer() {
  return (
    <ActivityContainerWrapper>
      <Actions />
      <TasksContainer>
        <TaskList />
      </TasksContainer>
    </ActivityContainerWrapper>
  );
}

export default ActivityContainer;
