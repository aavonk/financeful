import { RangeBar as Bar, RangeLabel, RangeContainer } from './style';

type Props = {
  id: string;
  percentOfAssets?: string;
  labelText: string;
  labelAmount: string;
  secondary?: boolean;
};

function RangeBar({ id, percentOfAssets, labelAmount, labelText, secondary }: Props) {
  return (
    <RangeContainer>
      <RangeLabel htmlFor={id}>
        <span>{labelText}</span>
        <span>{labelAmount}</span>
      </RangeLabel>
      <Bar id={id} percentage={percentOfAssets} secondary={secondary}>
        <span />
      </Bar>
    </RangeContainer>
  );
}

export default RangeBar;
