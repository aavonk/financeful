import { useState } from 'react';
import styled from 'styled-components';
import { BorderedSelect, BorderedInput } from '@Common/FormElements';
import { ACCOUNT_OPTIONS } from '@Constants/accountOptions';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
  value: string;
  ariaDescribedBy: string;
};

const SmallButton = styled.div`
  position: absolute;
  bottom: 85%;
  right: 8px;
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

function AccountTypeToggle({ value, onChange, ariaDescribedBy }: Props) {
  const [showSelect, setShowSelect] = useState(true);
  return (
    <>
      <SmallButton onClick={() => setShowSelect(!showSelect)} aria-label="Add new type">
        {showSelect ? 'Add new' : 'Cancel'}
      </SmallButton>
      {showSelect ? (
        <BorderedSelect
          label="Type"
          onChange={onChange}
          value={value}
          ariaDescribedBy={ariaDescribedBy}
          required
        >
          <option value="" disabled>
            Select a type
          </option>
          {ACCOUNT_OPTIONS.map((type, index) => (
            <option key={index} value={type.value}>
              {type.value}
            </option>
          ))}
        </BorderedSelect>
      ) : (
        <BorderedInput
          onChange={onChange}
          value={value}
          type="text"
          ariaDescribedBy={ariaDescribedBy}
          required
        >
          New Type
        </BorderedInput>
      )}
    </>
  );
}

export default AccountTypeToggle;
