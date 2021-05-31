import React from 'react';
import { TaskContainer, TaskTitle, SecondaryText } from './style';
import { LineChart as LineChartSVG } from '@Common/Icons';

type Props = {
  heading: string;
  subheading: string;
  onClick?: () => void;
};

function Task({ heading, subheading, onClick }: Props) {
  return (
    <TaskContainer onClick={onClick}>
      <LineChartSVG />
      <TaskTitle>{heading}</TaskTitle>
      <SecondaryText>{subheading}</SecondaryText>
    </TaskContainer>
  );
}

export default Task;
