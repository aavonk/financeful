import * as React from 'react';
import { StyledButton, ButtonText, Container } from './style';
import Dropdown from '@Common/Dropdown';
type Props = {
  children: React.ReactNode;
  text: string;
};

function DropdownButton({ children, text }: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Container>
      <StyledButton onClick={() => setOpen(true)}>
        <ButtonText>{text}</ButtonText>
      </StyledButton>
      <Dropdown open={open} setOpen={setOpen} className="dropdown-button">
        {children}
      </Dropdown>
    </Container>
  );
}

export default DropdownButton;
