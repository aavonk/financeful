import styled from 'styled-components';
import { parseISO, format } from 'date-fns';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';

const Tooltip = styled.div`
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.colors.darkThree};
  color: #fff;
  padding: 1rem;
  box-shadow: 15px 30px 40px rgba(0, 0, 0, 0.5);
  text-align: center;

  & > h4 {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

function CustomTooltip({ active, payload, label }: any) {
  if (active) {
    return (
      <Tooltip className="tooltip">
        <h4>{format(parseISO(new Date(label).toISOString()), 'eeee, d MMM, yyyy')}</h4>
        <p>{formatMoneyFromCentsToDollars(payload[0].value)}</p>
      </Tooltip>
    );
  }
  return null;
}

export default CustomTooltip;
