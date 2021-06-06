import React, { Ref } from 'react';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  InsetInput,
  InsetSelect,
} from '@Common/FormElements';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import AccountTypeToggle from './AccountTypeToggle';
import { CreateAccountInput, AccountType } from '@Generated/graphql';
import { convertInputAmountToCents, isValidCurrencyFormat } from '@Lib/money-utils';
import Button from '@Common/Button';
import { Footer } from '@Components/Modal/style';
import { FormRow } from '@Globals/index';

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
  accountType: ' ',
  classification: '',
  balance: '',
};

function AddAccountForm({ onFormSubmit, inputRef }: AddAccountProps) {
  const { values, handleChange, errors, handleSubmit, handleTrim } = useForm<FormState>({
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
      <div>
        <FormRow>
          <InsetInput
            type="text"
            value={values.accountName}
            onChange={handleChange('accountName')}
            onBlur={handleTrim('accountName')}
            ariaDescribedBy="name-errors"
            required
            ref={inputRef}
            data-testid="account-name-input"
          >
            Account name
          </InsetInput>
          {errors.accountName && (
            <ErrorMessage id="name-errors">{errors.accountName}</ErrorMessage>
          )}
        </FormRow>
        <FormRow>
          <InsetInput
            type="text"
            value={values.bankName}
            onChange={handleChange('bankName')}
            onBlur={handleTrim('bankName')}
            data-testid="bank-name-input"
          >
            Bank name
          </InsetInput>
        </FormRow>
        <FormRow>
          <AccountTypeToggle
            value={values.accountType}
            onChange={handleChange('accountType')}
            onBlur={handleTrim('accountType')}
            ariaDescribedBy="account-type-errors"
          />
          {errors.accountType && (
            <ErrorMessage id="account-type-errors">{errors.accountType}</ErrorMessage>
          )}
        </FormRow>
        <FormRow>
          <InsetInput
            type="text"
            value={values.balance}
            onChange={handleChange('balance')}
            onBlur={handleTrim('balance')}
            ariaDescribedBy="balance-errors"
            required
            data-testid="starting-balance-input"
          >
            Starting Balance
          </InsetInput>
          {errors.balance && (
            <ErrorMessage id="balance-errors">{errors.balance}</ErrorMessage>
          )}
        </FormRow>
        <FormRow>
          <InsetSelect
            label="Classification"
            value={values.classification}
            onChange={handleChange('classification')}
            ariaDescribedBy="classification-errors"
            required
            data-testid="classification-select"
          >
            <option value="" disabled>
              {' '}
            </option>
            <option value={AccountType.Asset}>Asset</option>
            <option value={AccountType.Liability}>Liability</option>
          </InsetSelect>
          {errors.classification && (
            <ErrorMessage id="classification-errors">
              {errors.classification}
            </ErrorMessage>
          )}
        </FormRow>
      </div>
      <Footer>
        <Button
          variant="primary"
          type="submit"
          data-testid="submit-account-button"
          fullWidth
        >
          Save
        </Button>
      </Footer>
    </form>
  );
}

export default AddAccountForm;
