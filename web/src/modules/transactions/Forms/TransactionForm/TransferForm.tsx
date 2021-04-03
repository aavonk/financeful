import * as React from 'react';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  BorderedDatePicker,
} from '@Common/FormElements';
import {
  isValidCurrencyFormat,
  convertInputAmountToCents,
} from '@Lib/money-utils';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import { Body, Footer } from '../style';
import { Category, Account } from '@Generated/graphql';
import Button from '@Common/Button';
import Progressbar from '@Common/Progressbar';

interface FormProps {
  accounts: Account[] | undefined;
  isSubmitting: boolean;
}

function TransferForm({ accounts = [], isSubmitting }: FormProps) {
  const [transferDate, setTransferDate] = React.useState(new Date());
  const [fromAccount, setFromAccount] = React.useState('');
  return (
    <>
      {isSubmitting && <Progressbar />}
      <form>
        <Body>
          <Row>
            <Col width="50%">
              <BorderedDatePicker
                selected={transferDate}
                onChange={(date: Date) => setTransferDate(date)}
                label="Date *"
              />
            </Col>
            {/* Dont forget to add Error messages */}
            <Col width="50%">
              <BorderedInput
                type="text"
                value="100.00"
                onChange={() => console.log('df')}
              >
                Amount
              </BorderedInput>
            </Col>
          </Row>
          <Row>
            <BorderedSelect
              value=""
              onChange={() => console.log('asf')}
              label="From Account *"
            >
              <option disabled value=""></option>
              {accounts.map((account: Account) => (
                <option key={account.id} value={account.id}>
                  {account.accountName}
                </option>
              ))}
            </BorderedSelect>
          </Row>
          <Row>
            <BorderedSelect
              value=""
              onChange={() => console.log('asf')}
              label="To Account *"
            >
              <option disabled value=""></option>
              {accounts.map((account: Account) => (
                <option key={account.id} value={account.id}>
                  {account.accountName}
                </option>
              ))}
            </BorderedSelect>
          </Row>
          <Row>
            <BorderedInput
              type="text"
              value="hi"
              onChange={() => console.log('as')}
            >
              Description
            </BorderedInput>
          </Row>
        </Body>
        <Footer>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Footer>
      </form>
    </>
  );
}

export default TransferForm;
