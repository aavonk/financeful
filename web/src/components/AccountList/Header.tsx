import Button from '@Common/Button';
import { HeaderContainer, Title } from './style';

function Header() {
  return (
    <HeaderContainer>
      <Title>
        <h3>All Accounts</h3>
        <p>Add, edit, or delete your accounts</p>
      </Title>
      <Button variant="primary" onClick={() => alert('todo')}>
        Add account
      </Button>
    </HeaderContainer>
  );
}

export default Header;
