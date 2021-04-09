import { useState, useEffect } from 'react';

import { Row, Col } from '@Globals/index';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  BorderedDatePicker,
} from '@Common/FormElements';
import {
  convertInputAmountToCents,
  formatMoneyFromCentsToDollars,
} from '@Lib/money-utils';
import { useForm } from '@Hooks/useForm';
import { Category, Account, TransferInput, Transfer } from '@Generated/graphql';
import { TransferFormFields } from '../types';
import { transferFormValidations } from '../formValidations';
import { Body, Footer } from '../style';
import Progressbar from '@Common/Progressbar';
import Button from '@Common/Button';

interface FormProps {
  accounts: Account[] | undefined;
  categories: Category[] | undefined;
  transfer: Transfer | undefined;
  isSubmitting: boolean;
}

function EditTransferForm({
  accounts = [],
  categories = [],
  isSubmitting,
  transfer,
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
                withPrefix
                prefix="$"
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
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Save
          </Button>
        </Footer>
      </form>
    </>
  );
}

export default EditTransferForm;
