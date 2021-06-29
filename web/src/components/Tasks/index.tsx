import React from 'react';
import { TaskContainer, TaskTitle, SecondaryText } from './style';
import { LineChart as LineChartSVG } from '@Common/Icons';
import Skeleton from '@Common/Skeleton';

export type Variants = 'default' | 'info';

type BaseProps = {
  heading: string | null;
  subheading: string;
  loading?: boolean;
  icon?: JSX.Element;
  variant?: Variants;
};

type ActionProps =
  | { isClickable: true; onClick: () => void }
  | { isClickable?: false; onClick?: never }
  | { isClickable: boolean; onClick?: () => void };

type Props = BaseProps & ActionProps;

function Task({
  heading,
  subheading,
  onClick,
  loading,
  isClickable,
  icon: IconComp,
  variant = 'default',
}: Props) {
  const DefaultIcon = IconComp ? IconComp : <LineChartSVG />;

  const handleClick = () => {
    if (!isClickable || !onClick) return;
    if (loading) return;

    return onClick();
  };
  return (
    <TaskContainer onClick={handleClick} isClickable={isClickable} $variant={variant}>
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
          {DefaultIcon}
          <TaskTitle>{heading}</TaskTitle>
          <SecondaryText>{subheading}</SecondaryText>
        </>
      )}
    </TaskContainer>
  );
}

export default Task;
