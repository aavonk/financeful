import React from 'react';
import { PulseBar } from './style';

type Props = {
  height: string;
  width: string;
  style?: React.CSSProperties;
};
function Skeleton({ height, width, style }: Props) {
  return <PulseBar height={height} width={width} style={style} />;
}

export default Skeleton;
