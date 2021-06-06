import React, { useState } from 'react';
import styled from 'styled-components';
import { InsetInput, InsetSelect } from '@Common/FormElements';
import { ACCOUNT_OPTIONS } from '@Constants/accountOptions';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  ariaDescribedBy: string;
};

const SmallButton = styled.div`
  position: absolute;
  right: 18px;
  font-size: 12px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:hover,
  :focus-visible {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

function AccountTypeToggle({ value, onChange, ariaDescribedBy, onBlur }: Props) {
  const [showSelect, setShowSelect] = useState(true);
  return (
    <>
      <SmallButton
        onClick={() => setShowSelect(!showSelect)}
        aria-label="Add new type"
        data-testid="add-new-button"
      >
        {showSelect ? 'Add new' : 'Cancel'}
      </SmallButton>
      {showSelect ? (
        <InsetSelect
          label="Type"
          onChange={onChange}
          value={value}
          ariaDescribedBy={ariaDescribedBy}
          required
          data-testid="account-type-select"
        >
          <option value=" " disabled>
            {' '}
          </option>
          {ACCOUNT_OPTIONS.map((type, index) => (
            <option key={index} value={type.value}>
              {type.value}
            </option>
          ))}
        </InsetSelect>
      ) : (
        <InsetInput
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          type="text"
          ariaDescribedBy={ariaDescribedBy}
          required
          data-testid="account-type-input"
        >
          New Type
        </InsetInput>
      )}
    </>
  );
}

export default AccountTypeToggle;
