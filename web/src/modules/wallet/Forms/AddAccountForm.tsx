import React, { Ref } from 'react';
import { BorderedInput, BorderedSelect, ErrorMessage } from '@Common/FormElements';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import AccountTypeToggle from './AccountTypeToggle';
import { CreateAccountInput, AccountType } from '@Generated/graphql';
import { convertInputAmountToCents, isValidCurrencyFormat } from '@Lib/money-utils';
import Button from '@Common/Button';
import { Footer } from '@Components/Modal/style';

type AddAccountProps = {
  onFormSubmit: (values: CreateAccountInput) => void;
  inputRef: Ref<HTMLInputElement>;
};

type FormState = {
  accountName: string;
  bankName: string;
  accountType: string;
  classification: string;
  balance: string;
};

const initialValue = {
  accountName: '',
  bankName: '',
  accountType: '',
  classification: '',
  balance: '',
};

function AddAccountForm({ onFormSubmit, inputRef }: AddAccountProps) {
  const { values, handleChange, errors, handleSubmit } = useForm<FormState>({
    initialValue,
    validations: {
      accountName: {
        required: {
          value: true,
          message: 'Account name is required',
        },
      },
      accountType: {
        required: {
          value: true,
          message: 'Please select a type or create a new one',
        },
      },
      balance: {
        required: {
          value: true,
          message: 'A starting balance is required',
        },
        custom: {
          isValid: (value: string) => isValidCurrencyFormat(value),
          message: 'Balance must be in $1,000.00 format',
        },
      },
      classification: {
        required: {
          value: true,
          message: 'Asset or Liability?',
        },
      },
    },
    onSubmit: () => {
      const typedClassification = values.classification as AccountType;
      onFormSubmit({
        ...values,
        balance: convertInputAmountToCents(values.balance),
        classification: typedClassification,
      });
    },
  });
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%' }}>
      <Row>
        <BorderedInput
          type="text"
          value={values.accountName}
          onChange={handleChange('accountName')}
          ariaDescribedBy="name-errors"
          required
          ref={inputRef}
          data-testid="account-name-input"
        >
          Account name
        </BorderedInput>
        {errors.accountName && (
          <ErrorMessage id="name-errors">{errors.accountName}</ErrorMessage>
        )}
      </Row>
      <Row style={{ marginBottom: '10px' }}>
        <BorderedInput
          type="text"
          value={values.bankName}
          onChange={handleChange('bankName')}
          data-testid="bank-name-input"
        >
          Bank name
        </BorderedInput>
      </Row>
      <Row style={{ position: 'relative', marginTop: '4px' }}>
        <AccountTypeToggle
          value={values.accountType}
          onChange={handleChange('accountType')}
          ariaDescribedBy="account-type-errors"
        />
        {errors.accountType && (
          <ErrorMessage id="account-type-errors">{errors.accountType}</ErrorMessage>
        )}
      </Row>
      <Row>
        <Col width="50%" paddingRightOnly>
          <BorderedInput
            type="text"
            withPrefix
            prefix="$"
            value={values.balance}
            onChange={handleChange('balance')}
            ariaDescribedBy="balance-errors"
            required
            data-testid="starting-balance-input"
          >
            Starting Balance
          </BorderedInput>
          {errors.balance && (
            <ErrorMessage id="balance-errors">{errors.balance}</ErrorMessage>
          )}
        </Col>
        <Col width="50%" paddingLeftOnly>
          <BorderedSelect
            label="Classification"
            value={values.classification}
            onChange={handleChange('classification')}
            ariaDescribedBy="classification-errors"
            required
            data-testid="classification-select"
          >
            <option value="" disabled></option>
            <option value={AccountType.Asset}>Asset</option>
            <option value={AccountType.Liability}>Liability</option>
          </BorderedSelect>
          {errors.classification && (
            <ErrorMessage id="classification-errors">
              {errors.classification}
            </ErrorMessage>
          )}
        </Col>
      </Row>
      <Footer style={{ padding: '0', marginTop: '20px' }}>
        <Button variant="primary" type="submit" data-testid="submit-account-button">
          Save
        </Button>
      </Footer>
    </form>
  );
}

export default AddAccountForm;
