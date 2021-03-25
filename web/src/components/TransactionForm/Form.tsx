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

interface TransactionFields {
  date: string;
  account: string;
  type: string;
  payee: string;
  description: string;
  amount: string;
  category: string;
}
const initialValue = {
  date: '',
  account: '',
  type: '',
  payee: '',
  description: '',
  amount: '',
  category: '',
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
};
function Form({ initialRef }: Props) {
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useForm<TransactionFields>({
    initialValue,
    validations,
    onSubmit: () => {
      const newValues = {
        ...values,
        accountId: 'testingaccountid',
        amount: parseFloat(values.amount) * 100,
        category: {
          id: 123456,
        },
      };
      console.log(newValues);
    },
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
                value={values.category}
                onChange={handleChange('category')}
                label="Category"
              >
                <option value="" disabled></option>
                <option value="category">Category 1</option>
                <option value="category">Category 1</option>
                <option value="category">Category 1</option>
                <option value="category">Category 1</option>
                <option value="category">Category 1</option>
                <option value="category">Category 1</option>
                <option value="category">Category 1</option>
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
