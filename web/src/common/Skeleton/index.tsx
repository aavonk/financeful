import React from 'react';
import { PulseBar } from './style';

type Props = {
  height: string;
  width: string;
};
function Skeleton({ height, width }: Props) {
  return <PulseBar height={height} width={width} />;
}

export default Skeleton;
