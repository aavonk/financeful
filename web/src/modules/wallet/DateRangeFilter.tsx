import styled from 'styled-components';
import DropdownButton, { DropdownItems } from '@Common/DropdownButton';
import { addDays, getEndOfMonth, getDateRange } from '@Lib/date-formatting';

function DateRangeFilter() {
  const dateRanges: DropdownItems = [
    {
      label: 'This month',
      onSelect: () => {
        const endOfMonth = getEndOfMonth(new Date());
        console.log(endOfMonth);
      },
    },
    {
      label: 'Last month',
      onSelect: () => console.log('60 days'),
    },
    {
      label: '90 days',
      onSelect: () => console.log('30 days'),
    },
    {
      label: '1 year',
      onSelect: () => console.log('30 days'),
    },
    {
      label: 'This year',
      onSelect: () => console.log('30 days'),
    },
    {
      label: 'Last year',
      onSelect: () => console.log('30 days'),
    },
  ];
  return (
    <Container>
      <DropdownButton id="date-filter" items={dateRanges} selected="90 days" small />
    </Container>
  );
}

export default DateRangeFilter;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`;
