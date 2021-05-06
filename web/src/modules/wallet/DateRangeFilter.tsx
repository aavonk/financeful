import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import DropdownButton, { DropdownItems } from '@Common/DropdownButton';
import { getDateRange } from '@Lib/date-formatting';
import { DateRangeState } from './BalanceHistoryChartController';

type Props = {
  setRange: Dispatch<SetStateAction<DateRangeState>>;
  selected: string;
};

function DateRangeFilter({ setRange, selected }: Props) {
  const dateRanges: DropdownItems = [
    {
      label: 'This month',
      onSelect: () => {
        const { startDate, endDate } = getDateRange('current-month');
        setRange({ startDate, endDate, label: 'This month' });
      },
    },
    {
      label: 'Last month',
      onSelect: () => {
        const { startDate, endDate } = getDateRange('last-month');
        setRange({ startDate, endDate, label: 'Last month' });
      },
    },
    {
      label: '90 days',
      onSelect: () => {
        const { startDate, endDate } = getDateRange('90-days');
        setRange({ startDate, endDate, label: '90 days' });
      },
    },
    {
      label: '1 year',
      onSelect: () => {
        const { startDate, endDate } = getDateRange('1-year');
        setRange({ startDate, endDate, label: '1 year' });
      },
    },
    {
      label: 'This year',
      onSelect: () => {
        const { startDate, endDate } = getDateRange('this-year');
        setRange({ startDate, endDate, label: 'This year' });
      },
    },
    {
      label: 'Last year',
      onSelect: () => {
        const { startDate, endDate } = getDateRange('last-year');
        setRange({ startDate, endDate, label: 'Last year' });
      },
    },
  ];
  return (
    <Container>
      <DropdownButton id="date-filter" items={dateRanges} selected={selected} small />
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
