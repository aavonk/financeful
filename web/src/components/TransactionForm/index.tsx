import { useState, useRef } from 'react';
import { Overlay, Content, Header, Title, Body } from './style';
import '@reach/dialog/styles.css';
import IconButton from '@Common/IconButton';
import { CloseIcon } from '@Common/Icons';
import { BorderedInput, BorderedSelect } from '@Common/FormElements';
import { Row, Col } from '@Globals/index';

function TransactionForm() {
  const [showDialog, setShowDialog] = useState(true); // Change back to false
  const initialRef = useRef<HTMLInputElement>(null);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  return (
    <div>
      <button onClick={open}>Open dialog</button>
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
          <Body>
            <Row>
              <Col width="25%">
                <BorderedInput
                  value="Hello"
                  type="text"
                  onChange={(e) => console.log(e.target.value)}
                  ref={initialRef}
                >
                  Date
                </BorderedInput>
              </Col>
              <Col width="37.5%">
                <BorderedSelect
                  value="Hello"
                  onChange={(e) => console.log(e.target.value)}
                  label="Account"
                >
                  <option value="">Option</option>
                  <option value="">Option</option>
                  <option value="">Option</option>
                </BorderedSelect>
              </Col>
              <Col width="37.5%">
                <BorderedInput
                  value="Hello"
                  type="text"
                  onChange={(e) => console.log(e.target.value)}
                >
                  Type
                </BorderedInput>
              </Col>
            </Row>
            <Row>
              <Col width="100%">
                <BorderedInput
                  value="Hello"
                  type="text"
                  onChange={(e) => console.log(e.target.value)}
                >
                  Payee
                </BorderedInput>
              </Col>
            </Row>
            <Row>
              <Col width="100%">
                <BorderedInput
                  value="Hello"
                  type="text"
                  onChange={(e) => console.log(e.target.value)}
                >
                  Description
                </BorderedInput>
              </Col>
            </Row>
            <Row>
              <Col width="50%">
                <BorderedInput
                  value="Hello"
                  type="text"
                  onChange={(e) => console.log(e.target.value)}
                >
                  Amount
                </BorderedInput>
              </Col>
              <Col width="50%">
                <BorderedInput
                  value="Hello"
                  type="text"
                  onChange={(e) => console.log(e.target.value)}
                >
                  Category
                </BorderedInput>
              </Col>
            </Row>
          </Body>
        </Content>
      </Overlay>
    </div>
  );
}

export default TransactionForm;
