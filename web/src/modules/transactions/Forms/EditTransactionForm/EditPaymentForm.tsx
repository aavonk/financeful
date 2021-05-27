import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@Common/Button';
import { Transaction, Category, Account, TransactionInput } from '@Generated/graphql';
import { Body, Footer, FormRow } from '../style';
import {
  ErrorMessage,
  InsetInput,
  InsetSelect,
  InsetDatePicker,
} from '@Common/FormElements';
import { useForm } from '@Hooks/useForm';
import {
  formatMoneyFromCentsToDollars,
  convertInputAmountToCents,
} from '@Lib/money-utils';
import { TransactionFields } from '../types';
import { paymentFormValidations } from '../formValidations';
import Progressbar from '@Common/Progressbar';

type Props = {
  transaction: Transaction;
  categories: Category[] | undefined;
  accounts: Account[] | undefined;
  onFormSubmit: (values: TransactionInput) => void;
  onDelete: () => Promise<void> | undefined;
  isSubmitting: boolean;
};

function EditPaymentForm({
  transaction,
  categories = [],
  accounts = [],
  onFormSubmit,
  isSubmitting,
  onDelete,
}: Props) {
  const [transDate, setTransDate] = useState(new Date(transaction.date));
  const initialValue = {
    date: new Date(transaction.date),
    accountId: transaction.accountId ? transaction.accountId : '',
    description: transaction.description ? transaction.description : '',
    categoryId: transaction.category?.id ? transaction.category.id : '',
    type: transaction.type,
    payee: transaction.payee,
    amount: formatMoneyFromCentsToDollars(transaction.amount, false),
  };
  const {
    values,
    handleSubmit,
    handleChange,
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
              label="Date *"
            />

            <ErrorMessage>{errors.date ? errors.date : null}</ErrorMessage>
          </FormRow>
          <FormRow>
            <InsetSelect
              value={values.accountId}
              onChange={handleChange('accountId')}
              label="Account *"
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
            <InsetSelect
              value={values.type}
              onChange={handleChange('type')}
              label="Type *"
            >
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
              Payee *
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
              Description
            </InsetInput>
          </FormRow>
          <FormRow>
            <InsetInput
              value={values.amount}
              type="text"
              onChange={handleChange('amount')}
              onBlur={handleTrim('amount')}
            >
              Amount *
            </InsetInput>
            <ErrorMessage>{errors.amount ? errors.amount : null}</ErrorMessage>
          </FormRow>
          <FormRow>
            <InsetSelect
              value={values.categoryId}
              onChange={handleChange('categoryId')}
              label="Category"
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

export default EditPaymentForm;
