import React from 'react';
import { TaskContainer, TaskTitle, SecondaryText } from './style';
import { LineChart as LineChartSVG } from '@Common/Icons';
import Skeleton from '@Common/Skeleton';

type Props = {
  heading: string;
  subheading: string;
  onClick?: () => void;
  loading?: boolean;
};

function Task({ heading, subheading, onClick, loading }: Props) {
  return (
    <TaskContainer onClick={loading ? undefined : onClick}>
      {loading ? (
        <>
          <TaskTitle>
            <Skeleton width="80%" height="24px" />
          </TaskTitle>
          <SecondaryText>
            <Skeleton width="100%" height="12px" />
          </SecondaryText>
        </>
      ) : (
        <>
          <LineChartSVG />
          <TaskTitle>{heading}</TaskTitle>
          <SecondaryText>{subheading}</SecondaryText>
        </>
      )}
    </TaskContainer>
  );
}

export default Task;
