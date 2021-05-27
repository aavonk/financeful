import * as React from 'react';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  BorderedDatePicker,
  InsetDatePicker,
  InsetInput,
  InsetSelect,
} from '@Common/FormElements';
import { convertInputAmountToCents } from '@Lib/money-utils';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import { Body, Footer, FormRow } from '../style';
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
          <FormRow>
            <InsetDatePicker
              selected={transferDate}
              onChange={(date: Date) => setTransferDate(date)}
              label="Date"
            />
          </FormRow>
          <FormRow>
            <InsetInput
              type="text"
              value={values.amount}
              onChange={handleChange('amount')}
              onBlur={handleTrim('amount')}
            >
              Amount
            </InsetInput>
            {errors?.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
          </FormRow>

          <FormRow>
            <InsetSelect
              value={values.fromAccount}
              onChange={handleChange('fromAccount')}
              label="From account"
            >
              <option disabled value=""></option>
              {accounts.map((account: Account) => (
                <option key={account.id} value={account.id}>
                  {account.accountName}
                </option>
              ))}
            </InsetSelect>
            {errors?.fromAccount && <ErrorMessage>{errors.fromAccount}</ErrorMessage>}
          </FormRow>
          <FormRow>
            <InsetSelect
              value={values.toAccount}
              onChange={handleChange('toAccount')}
              label="To account"
            >
              <option disabled value=""></option>
              {accounts.map((account: Account) => (
                <option key={account.id} value={account.id}>
                  {account.accountName}
                </option>
              ))}
            </InsetSelect>
            {errors?.toAccount && <ErrorMessage>{errors.toAccount}</ErrorMessage>}
          </FormRow>
          <FormRow>
            <InsetSelect
              value={values.categoryId}
              onChange={handleChange('categoryId')}
              label="Category (optional)"
            >
              <option value="" disabled></option>
              {categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id} data-testid="category-option">
                  {cat.name}
                </option>
              ))}
            </InsetSelect>
          </FormRow>
          <FormRow>
            <InsetInput
              type="text"
              value={values.description}
              onChange={handleChange('description')}
              onBlur={handleTrim('description')}
            >
              Description (optional)
            </InsetInput>
          </FormRow>
        </Body>
        <Footer>
          <Button type="submit" variant="primary" fullWidth>
            Save
          </Button>
        </Footer>
      </form>
    </>
  );
}

export default TransferForm;
