import * as React from 'react';
import {
  ErrorMessage,
  InsetDatePicker,
  InsetInput,
  InsetSelect,
} from '@Common/FormElements';
import { useForm } from '@Hooks/useForm';
import { Body, Footer, FormRow } from '../style';
import { convertInputAmountToCents } from '@Lib/money-utils';
import Button from '@Common/Button';
import Progressbar from '@Common/Progressbar';
import { TransactionFields } from '../types';
import { Category, Account, TransactionInput } from '@Generated/graphql';
import { paymentFormValidations } from '../formValidations';

const initialValue = {
  date: new Date(),
  accountId: '',
  type: '',
  payee: '',
  description: '',
  amount: '',
  categoryId: '',
};

type Props = {
  onFormSubmit: (values: TransactionInput) => void;
  categories: Category[] | undefined;
  accounts: Account[] | undefined;
  isSubmitting: boolean;
};

function PaymentForm({
  onFormSubmit,
  categories = [],
  accounts = [],
  isSubmitting,
}: Props) {
  const [transDate, setTransDate] = React.useState(new Date());
  const {
    values,
    handleChange,
    handleSubmit,
    handleTrim,
    errors,
  } = useForm<TransactionFields>({
    initialValue,
    validations: paymentFormValidations,
    onSubmit: () =>
      onFormSubmit({
        ...values,
        date: transDate,
        amount: convertInputAmountToCents(values.amount),
      }),
  });
  return (
    <>
      {isSubmitting && <Progressbar />}
      <form onSubmit={handleSubmit}>
        <Body>
          <FormRow>
            <InsetDatePicker
              selected={transDate}
              onChange={(date: Date) => setTransDate(date)}
              label="Date"
            />
            <ErrorMessage>{errors.date ? errors.date : null}</ErrorMessage>
          </FormRow>

          <FormRow>
            <InsetSelect
              value={values.accountId}
              onChange={handleChange('accountId')}
              label="Account"
            >
              <option value="" disabled></option>
              {accounts.map((acct) => (
                <option key={acct.id} value={acct.id} data-testid="acct-option">
                  {acct.accountName}
                </option>
              ))}
            </InsetSelect>
            <ErrorMessage>{errors.accountId ? errors.accountId : null}</ErrorMessage>
          </FormRow>
          <FormRow>
            <InsetSelect value={values.type} onChange={handleChange('type')} label="Type">
              <option value="" disabled></option>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </InsetSelect>
            <ErrorMessage>{errors.type ? errors.type : null}</ErrorMessage>
          </FormRow>
          <FormRow>
            <InsetInput
              value={values.payee}
              type="text"
              onChange={handleChange('payee')}
              onBlur={handleTrim('payee')}
            >
              Payee
            </InsetInput>
            <ErrorMessage>{errors.payee ? errors.payee : null}</ErrorMessage>
          </FormRow>
          <FormRow>
            <InsetInput
              value={values.description}
              type="text"
              onChange={handleChange('description')}
              onBlur={handleTrim('description')}
            >
              Description (optional)
            </InsetInput>
          </FormRow>
          <FormRow>
            <InsetInput
              value={values.amount}
              type="text"
              onChange={handleChange('amount')}
              onBlur={handleTrim('amount')}
            >
              Amount
            </InsetInput>
            <ErrorMessage>{errors.amount ? errors.amount : null}</ErrorMessage>
          </FormRow>
          <FormRow>
            <InsetSelect
              value={values.categoryId}
              onChange={handleChange('categoryId')}
              label="Category (optional)"
            >
              <option value="" disabled></option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} data-testid="category-option">
                  {cat.name}
                </option>
              ))}
            </InsetSelect>
          </FormRow>
        </Body>
        <Footer>
          <Button type="submit" variant="primary" disabled={isSubmitting} fullWidth>
            Save
          </Button>
        </Footer>
      </form>
    </>
  );
}

export default PaymentForm;
