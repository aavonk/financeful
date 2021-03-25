import '@reach/dialog/styles.css';
import { useState, useRef } from 'react';
import { Overlay, Content, Header, Title } from './style';
import IconButton from '@Common/IconButton';
import Button from '@Common/Button';
import { CloseIcon } from '@Common/Icons';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import Form from './Form';

function TransactionForm() {
  const smallDevice = useMediaQuery('(max-width: 605px)');
  const [showDialog, setShowDialog] = useState(false);
  const initialRef = useRef<HTMLInputElement>(null);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  //TODO: Make sure each field is trimmed
  return (
    <div>
      <Button onClick={open} variant="primary">
        {smallDevice ? 'New' : 'New Transaction'}
      </Button>
      <Overlay
        isOpen={showDialog}
        onDismiss={close}
        initialFocusRef={initialRef}
      >
        <Content aria-label="Add transaction form">
          <Header>
            <IconButton blue small onClick={close} ariaText="Close">
              <CloseIcon />
            </IconButton>
            <Title>Add transaction</Title>
          </Header>
          <Form initialRef={initialRef} />
        </Content>
      </Overlay>
    </div>
  );
}

export default TransactionForm;
