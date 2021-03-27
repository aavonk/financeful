import * as React from 'react';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  BorderedDatePicker,
} from '@Common/FormElements';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import { Body, Footer } from './style';
import { isValidCurrencyFormat } from '@Lib/isValidCurrency';
import Button from '@Common/Button';
import { TransactionFields } from './index';
import { Category, Account } from '@Generated/graphql';

const initialValue = {
  date: new Date(),
  accountId: '',
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
  accountId: {
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
  onFormSubmit: (values: TransactionFields) => void;
  categories: Category[] | undefined;
  accounts: Account[] | undefined;
  isSubmitting: boolean;
};

function Form({
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
    errors,
  } = useForm<TransactionFields>({
    initialValue,
    validations,
    onSubmit: () => onFormSubmit({ ...values, date: transDate }),
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Body>
          <Row>
            <Col width="25%">
              <BorderedDatePicker
                selected={transDate}
                onChange={(date: Date) => setTransDate(date)}
                label="Date *"
              />

              <ErrorMessage>{errors.date ? errors.date : null}</ErrorMessage>
            </Col>
            <Col width="37.5%">
              <BorderedSelect
                value={values.accountId}
                onChange={handleChange('accountId')}
                label="Account *"
              >
                <option value="" disabled></option>
                {accounts.map((acct) => (
                  <option
                    key={acct.id}
                    value={acct.id}
                    data-testid="acct-option"
                  >
                    {acct.accountName}
                  </option>
                ))}
              </BorderedSelect>
              <ErrorMessage>
                {errors.accountId ? errors.accountId : null}
              </ErrorMessage>
            </Col>
            <Col width="37.5%">
              <BorderedSelect
                value={values.type}
                onChange={handleChange('type')}
                label="Type *"
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
                Payee *
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
                Amount *
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
                  <option
                    key={cat.id}
                    value={cat.id}
                    data-testid="category-option"
                  >
                    {cat.name}
                  </option>
                ))}
              </BorderedSelect>
            </Col>
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

export default Form;
