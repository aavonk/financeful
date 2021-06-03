import React from 'react';
import Actions from './Actions';
import { ActivityContainerWrapper, TasksContainer } from './style';
import TaskList from './TaskList/TaskList';

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
    </ActivityContainerWrapper>
  );
}

export default ActivityContainer;
