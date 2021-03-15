import * as React from 'react';
import { StyledButton, ButtonText, Container } from './style';
import Dropdown from '@Common/Dropdown';
type Props = {
  children: React.ReactNode;
  text: string;
  ariaLabel: string;
};

function DropdownButton({ children, text, ariaLabel }: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Container>
      <StyledButton onClick={() => setOpen(true)} id={ariaLabel}>
        <ButtonText>{text}</ButtonText>
      </StyledButton>
      <Dropdown
        open={open}
        setOpen={setOpen}
        className="dropdown-button"
        ariaLabeledBy={ariaLabel}
      >
        {children}
      </Dropdown>
    </Container>
  );
}

export default DropdownButton;
