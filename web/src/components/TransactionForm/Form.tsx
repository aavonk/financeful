import * as React from 'react';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
} from '@Common/FormElements';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import { Body, Footer } from './style';
import { isValidCurrencyFormat } from '@Lib/isValidCurrency';
import Button from '@Common/Button';
import { TransactionFields } from './index';
import { Category } from '@Generated/graphql';

const initialValue = {
  date: '',
  account: '',
  type: '',
  payee: '',
  description: '',
  amount: '',
  categoryId: '',
};

const validations = {
  date: {
    required: {
      value: true,
      message: 'Required',
    },
  },
  account: {
    required: {
      value: true,
      message: 'Which account?',
    },
  },
  type: {
    required: {
      value: true,
      message: 'Income or Expense?',
    },
  },
  payee: {
    required: {
      value: true,
      message: 'Please add a payee',
    },
  },
  amount: {
    required: {
      value: true,
      message: 'Please add an amount',
    },
    custom: {
      isValid: (value: string) => isValidCurrencyFormat(value),
      message: 'Must be in $1,000.00 format',
    },
  },
};

type Props = {
  initialRef: React.RefObject<HTMLInputElement>;
  onFormSubmit: (values: TransactionFields) => void;
  categories: Category[] | undefined;
};

function Form({ initialRef, onFormSubmit, categories = [] }: Props) {
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useForm<TransactionFields>({
    initialValue,
    validations,
    onSubmit: () => onFormSubmit(values),
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Body>
          <Row>
            <Col width="25%">
              <BorderedInput
                value={values.date}
                type="text"
                onChange={handleChange('date')}
                ref={initialRef}
              >
                Date
              </BorderedInput>
              <ErrorMessage>{errors.date ? errors.date : null}</ErrorMessage>
            </Col>
            <Col width="37.5%">
              <BorderedSelect
                value={values.account}
                onChange={handleChange('account')}
                label="Account"
              >
                <option value="" disabled></option>
                <option value="option 1">Option</option>
                <option value=" option 2">Option</option>
                <option value="option 3">Option</option>
              </BorderedSelect>
              <ErrorMessage>
                {errors.account ? errors.account : null}
              </ErrorMessage>
            </Col>
            <Col width="37.5%">
              <BorderedSelect
                value={values.type}
                onChange={handleChange('type')}
                label="Type"
              >
                <option value="" disabled></option>
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
              </BorderedSelect>
              <ErrorMessage>{errors.type ? errors.type : null}</ErrorMessage>
            </Col>
          </Row>
          <Row>
            <Col width="100%">
              <BorderedInput
                value={values.payee}
                type="text"
                onChange={handleChange('payee')}
              >
                Payee
              </BorderedInput>
              <ErrorMessage>{errors.payee ? errors.payee : null}</ErrorMessage>
            </Col>
          </Row>
          <Row>
            <Col width="100%">
              <BorderedInput
                value={values.description}
                type="text"
                onChange={handleChange('description')}
              >
                Description
              </BorderedInput>
            </Col>
          </Row>
          <Row>
            <Col width="50%">
              <BorderedInput
                value={values.amount}
                type="text"
                onChange={handleChange('amount')}
                withPrefix
                prefix="$"
              >
                Amount
              </BorderedInput>
              <ErrorMessage>
                {errors.amount ? errors.amount : null}
              </ErrorMessage>
            </Col>
            <Col width="50%">
              <BorderedSelect
                value={values.categoryId}
                onChange={handleChange('categoryId')}
                label="Category"
              >
                <option value="" disabled></option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </BorderedSelect>
            </Col>
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

export default Form;
