import React from 'react';
import { TaskContainer, TaskTitle, SecondaryText } from './style';
import { LineChart as LineChartSVG } from '@Common/Icons';

function Task() {
  return (
    <TaskContainer>
      <LineChartSVG />
      <TaskTitle>Review 4 transactions</TaskTitle>
      <SecondaryText>Ensure your transactions are categorized properly</SecondaryText>
    </TaskContainer>
  );
}

export default Task;
