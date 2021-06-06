import React from 'react';
import { TaskContainer, TaskTitle, SecondaryText } from './style';
import { LineChart as LineChartSVG } from '@Common/Icons';
import Skeleton from '@Common/Skeleton';

type BaseProps = {
  heading: string | null;
  subheading: string;
  loading?: boolean;
};

type ActionProps =
  | { isClickable: true; onClick: () => void }
  | { isClickable?: false; onClick?: never }
  | { isClickable: boolean; onClick?: () => void };

type Props = BaseProps & ActionProps;

function Task({ heading, subheading, onClick, loading, isClickable }: Props) {
  const handleClick = () => {
    if (!isClickable || !onClick) return;
    if (loading) return;

    return onClick();
  };
  return (
    <TaskContainer onClick={handleClick} isClickable={isClickable}>
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
