/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useEffect, useState } from 'react';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  InsetInput,
  InsetSelect,
} from '@Common/FormElements';
import { Row, Col, FormRow } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import { EditAccountInput, AccountType } from '@Generated/graphql';
import { ModalRoot, ModalBody, ModalTitle } from '@Components/Modal';

import { Footer } from '@Components/Modal/style';
import { Account } from '@Generated/graphql';
import Button from '@Common/Button';
import Progressbar from '@Common/Progressbar';

type EditAccountFormProps = {
  onFormSubmit: (accountId: string, values: EditAccountInput) => void;
  account: Account | null;
  isSubmitting: boolean;
  isOpen: boolean;
  onDismiss: () => void;
};

type FormState = {
  accountName: string;
  bankName: string;
  accountType: string;
  classification: string;
};

function EditAccountForm({
  account,
  onFormSubmit,
  isSubmitting,
  isOpen,
  onDismiss,
}: EditAccountFormProps) {
  const initialFormState = {
    accountName: account?.accountName ? account.accountName : '',
    bankName: account?.bankName ? account.bankName : '',
    accountType: account?.accountType ? account.accountType : '',
    classification: account?.isAsset ? 'asset' : 'liability',
  };
  const [initialValue, setInitialValue] = useState<FormState>(initialFormState);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { values, handleChange, errors, handleSubmit, handleTrim } = useForm<FormState>({
    initialValue,
    useEffectOnMount: true,
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
      classification: {
        required: {
          value: true,
          message: 'Asset or Liability?',
        },
      },
    },
    onSubmit: () => {
      const typedClassification = values.classification as AccountType;
      onFormSubmit(account!.id, { ...values, classification: typedClassification });
    },
  });

  useEffect(() => {
    setInitialValue({
      accountName: account?.accountName ? account.accountName : '',
      bankName: account?.bankName ? account.bankName : '',
      accountType: account?.accountType ? account.accountType : '',
      classification: account?.isAsset ? 'asset' : 'liability',
    });
  }, [account]);

  return (
    <ModalRoot
      isOpen={isOpen}
      onDismiss={onDismiss}
      ariaLabel="Edit account"
      initialFocusRef={inputRef}
    >
      <ModalTitle title="Edit account" onClose={onDismiss} />
      {isSubmitting && <Progressbar />}
      <ModalBody overrideStyle={{ padding: '0.825rem 1rem 0 1rem' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%' }}>
          <FormRow>
            <InsetInput
              type="text"
              value={values.accountName}
              onChange={handleChange('accountName')}
              onBlur={handleTrim('accountName')}
              ariaDescribedBy="name-errors"
              required
              ref={inputRef}
              data-testid="edit-account-name-input"
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
              ariaDescribedBy="bank-errors"
            >
              Bank Name
            </InsetInput>
          </FormRow>

          <FormRow>
            <InsetInput
              type="text"
              value={values.accountType}
              onChange={handleChange('accountType')}
              onBlur={handleTrim('accountType')}
              ariaDescribedBy="type-errors"
            >
              Type
            </InsetInput>
          </FormRow>
          <FormRow>
            <InsetSelect
              label="Classification"
              value={values.classification}
              onChange={handleChange('classification')}
              ariaDescribedBy="classification-errors"
              required
            >
              <option value="" disabled></option>
              <option value={AccountType.Asset}>Asset</option>
              <option value={AccountType.Liability}>Liability</option>
            </InsetSelect>
            {errors.classification && (
              <ErrorMessage id="classification-errors">
                {errors.classification}
              </ErrorMessage>
            )}
          </FormRow>

          <Footer>
            <Button variant="primary" type="submit" fullWidth>
              Save
            </Button>
          </Footer>
        </form>
      </ModalBody>
    </ModalRoot>
  );
}

export default EditAccountForm;
