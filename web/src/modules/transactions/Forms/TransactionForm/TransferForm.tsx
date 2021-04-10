import * as React from 'react';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  BorderedDatePicker,
} from '@Common/FormElements';
import { convertInputAmountToCents } from '@Lib/money-utils';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import { Body, Footer } from '../style';
import { Category, Account, TransferInput } from '@Generated/graphql';
import Button from '@Common/Button';
import Progressbar from '@Common/Progressbar';
import { TransferFormFields } from '../types';
import { transferFormValidations } from '../formValidations';

interface FormProps {
  accounts: Account[] | undefined;
  categories: Category[] | undefined;
  isSubmitting: boolean;
  onFormSubmit: (values: TransferInput) => void;
}

const initialState = {
  amount: '',
  fromAccount: '',
  toAccount: '',
  categoryId: '',
  description: '',
};

function TransferForm({
  accounts = [],
  categories = [],
  isSubmitting,
  onFormSubmit,
}: FormProps) {
  const [transferDate, setTransferDate] = React.useState(new Date());

  const {
    values,
    handleChange,
    handleSubmit,
    handleTrim,
    errors,
  } = useForm<TransferFormFields>({
    initialValue: initialState,
    validations: transferFormValidations,
    onSubmit: () => {
      onFormSubmit({
        ...values,
        amount: convertInputAmountToCents(values.amount),
        date: transferDate,
      });
    },
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
          <Row>
            <BorderedSelect
              value={values.fromAccount}
              onChange={handleChange('fromAccount')}
              label="From Account *"
            >
              <option disabled value=""></option>
              {accounts.map((account: Account) => (
                <option key={account.id} value={account.id}>
                  {account.accountName}
                </option>
              ))}
            </BorderedSelect>
            {errors?.fromAccount && <ErrorMessage>{errors.fromAccount}</ErrorMessage>}
          </Row>
          <Row>
            <BorderedSelect
              value={values.toAccount}
              onChange={handleChange('toAccount')}
              label="To Account *"
            >
              <option disabled value=""></option>
              {accounts.map((account: Account) => (
                <option key={account.id} value={account.id}>
                  {account.accountName}
                </option>
              ))}
            </BorderedSelect>
            {errors?.toAccount && <ErrorMessage>{errors.toAccount}</ErrorMessage>}
          </Row>
          <Row>
            <BorderedSelect
              value={values.categoryId}
              onChange={handleChange('categoryId')}
              label="Category"
            >
              <option value="" disabled></option>
              {categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id} data-testid="category-option">
                  {cat.name}
                </option>
              ))}
            </BorderedSelect>
          </Row>
          <Row>
            <BorderedInput
              type="text"
              value={values.description}
              onChange={handleChange('description')}
              onBlur={handleTrim('description')}
            >
              Description
            </BorderedInput>
          </Row>
        </Body>
        <Footer>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Footer>
      </form>
    </>
  );
}

export default TransferForm;
