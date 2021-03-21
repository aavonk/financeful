import { useState } from 'react';
import { Overlay, Content, Header, Title } from './style';
import '@reach/dialog/styles.css';
import IconButton from '@Common/IconButton';
import { CloseIcon } from '@Common/Icons';

function TransactionForm() {
  const [showDialog, setShowDialog] = useState(true); // Change back to false
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  return (
    <div>
      <button onClick={open}>Open dialog</button>
      <Overlay isOpen={showDialog} onDismiss={close}>
        <Content>
          <Header>
            <IconButton blue small onClick={close} ariaText="Close">
              <CloseIcon />
            </IconButton>
            <Title>Add transaction</Title>
          </Header>
        </Content>
      </Overlay>
    </div>
  );
}

export default TransactionForm;
