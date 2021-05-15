import React from 'react';
import styled from 'styled-components';
import DropdownButton, { DropdownItems } from '@Common/DropdownButton';
import { getDateRange } from '@Lib/date-formatting';
import { SecondaryDatePicker } from '@Common/FormElements';
import { DateRangeContext } from '@Context/daterange/DateRangeContext';

interface Props extends DateRangeContext {
  selected: string;
}

export type DateRangeState = {
  startDate: Date;
  endDate: Date;
  label: string;
};

function DateRangeFilter({ setRange, selected, range }: Props) {
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

  const onCustomDateChange = (date: Date, item: 'start' | 'end') => {
    if (item === 'start') {
      return setRange((old) => ({ ...old, startDate: date, label: 'Custom' }));
    }
    setRange((old) => ({ ...old, endDate: date, label: 'Custom' }));
  };

  return (
    <Container>
      <DropdownButton
        id="date-filter"
        items={dateRanges}
        selected={selected}
        small
        data-testid="date-range-button"
        overrideButtonStyle={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <InputContainer>
        <SecondaryDatePicker
          selected={range.startDate}
          onChange={(date: Date) => onCustomDateChange(date, 'start')}
          label="Date *"
        />
        <FillerText>to</FillerText>
        <SecondaryDatePicker
          selected={range.endDate}
          onChange={(date: Date) => onCustomDateChange(date, 'end')}
          label="Date *"
        />
      </InputContainer>
    </Container>
  );
}

export default DateRangeFilter;

const Container = styled.div`
  /* width: 100%; */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 10px;
`;

const FillerText = styled.label`
  background: ${({ theme }) => theme.colors.darkThree};
  font-size: 0.8rem;
  height: 32px;
  margin-top: 2px;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  display: inline-flex;
  /* position: relative; */
`;
