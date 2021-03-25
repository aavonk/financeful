import { useState } from 'react';
import TransactionForm from '@Components/TransactionForm';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerStyles } from '@Globals/datepicker';

function DashboardPage() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div>Dashboard page yay</div>;
      <TransactionForm />
      <DatePickerStyles>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => console.log(date)}
          calendarClassName="fin"
        />
      </DatePickerStyles>
    </>
  );
}

export default DashboardPage;
