import { useState } from 'react';
import { Row, Col } from '@Globals/index';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  BorderedDatePicker,
} from '@Common/FormElements';
import { isValidCurrencyFormat, convertInputAmountToCents } from '@Lib/money-utils';
import { useForm } from '@Hooks/useForm';
import { Category, Account, TransferInput } from '@Generated/graphql';
import { TransferFormFields } from '../types';
import { transferFormValidations } from '../formValidations';
import { Body } from '../style';
import Progressbar from '@Common/Progressbar';

interface FormProps {
  accounts: Account[] | undefined;
  categories: Category[] | undefined;
  isSubmitting: boolean;
}

function EditTransferForm({ accounts = [], categories = [], isSubmitting }: FormProps) {
  const [transferDate, setTransferDate] = useState(new Date());
  const initialValue: TransferFormFields = {
    amount: '',
    fromAccount: '',
    toAccount: '',
    categoryId: '',
    description: '',
  };
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleTrim,
  } = useForm<TransferFormFields>({
    validations: transferFormValidations,
    initialValue,
  });
  return (
    <>
      {isSubmitting && <Progressbar />}
      <form onSubmit={handleSubmit}>
        <Body>
          <Row>
            <Col width="50%">
              <BorderedDatePicker
                selected={transferDate}
                onChange={(date: Date) => setTransferDate(date)}
                label="Date *"
              />
            </Col>
            <Col width="50%">
              <BorderedInput
                type="text"
                value={values.amount}
                onChange={handleChange('amount')}
                onBlur={handleTrim('amount')}
              >
                Amount
              </BorderedInput>
              {errors?.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
            </Col>
          </Row>
        </Body>
        {/* TODO: Make sure to disable button when isSubmitting is true */}
      </form>
    </>
  );
}

export default EditTransferForm;
