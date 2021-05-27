import React, { useState, useEffect } from 'react';

import { Row, Col } from '@Globals/index';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  BorderedDatePicker,
  InsetInput,
  InsetSelect,
  InsetDatePicker,
} from '@Common/FormElements';
import {
  convertInputAmountToCents,
  formatMoneyFromCentsToDollars,
} from '@Lib/money-utils';
import { useForm } from '@Hooks/useForm';
import { Category, Account, TransferInput, Transfer } from '@Generated/graphql';
import { TransferFormFields } from '../types';
import { transferFormValidations } from '../formValidations';
import { Body, Footer, FormRow } from '../style';
import Progressbar from '@Common/Progressbar';
import Button from '@Common/Button';

interface FormProps {
  accounts: Account[] | undefined;
  categories: Category[] | undefined;
  transfer: Transfer | undefined;
  isSubmitting: boolean;
  onFormSubmit: (values: TransferInput, id: string) => void;
  onDelete: () => Promise<void> | undefined;
}

function EditTransferForm({
  accounts = [],
  categories = [],
  isSubmitting,
  transfer,
  onFormSubmit,
  onDelete,
}: FormProps) {
  const [transferDate, setTransferDate] = useState(new Date());
  const initialValue: TransferFormFields = {
    amount: transfer?.amount ? formatMoneyFromCentsToDollars(transfer.amount, false) : '',
    fromAccount: transfer?.fromAccount?.id || '',
    toAccount: transfer?.toAccount?.id || '',
    categoryId: transfer?.category?.id || '',
    description: transfer?.description || '',
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
    onSubmit: () => {
      onFormSubmit(
        {
          ...values,
          date: transferDate,
          amount: convertInputAmountToCents(values.amount),
        },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        transfer!.id,
      );
    },
  });

  useEffect(() => {
    if (transfer?.date) {
      setTransferDate(new Date(transfer.date));
    }
  }, [transfer?.date]);
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
              withPrefix
              prefix="$"
            >
              Amount
            </InsetInput>
            {errors?.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
          </FormRow>
          <FormRow>
            <InsetSelect
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
            </InsetSelect>
            {errors?.fromAccount && <ErrorMessage>{errors.fromAccount}</ErrorMessage>}
          </FormRow>
          <FormRow>
            <InsetSelect
              value={values.toAccount}
              onChange={handleChange('toAccount')}
              label="To Account"
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
              label="Category"
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
              Description
            </InsetInput>
          </FormRow>
        </Body>
        <Footer justify="space-between">
          <Button
            variant="danger-secondary"
            onClick={(e: any) => {
              e.preventDefault();
              onDelete();
            }}
          >
            Delete
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Save
          </Button>
        </Footer>
      </form>
    </>
  );
}

export default EditTransferForm;
