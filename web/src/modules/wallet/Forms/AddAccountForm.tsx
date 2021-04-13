import { BorderedInput, ErrorMessage } from '@Common/FormElements';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import AccountTypeToggle from './AccountTypeSelect';

type AddAccountProps = {
  onFormSubmit: () => void;
};

type FormState = {
  accountName: string;
  bankName: string;
  type: string;
  startingBalance: string;
};

const initialValue = {
  accountName: '',
  bankName: '',
  type: '',
  startingBalance: '',
};

function AddAccountForm({ onFormSubmit }: AddAccountProps) {
  const { values, handleChange } = useForm<FormState>({
    initialValue,
  });
  return (
    <>
      <Row>
        <BorderedInput
          type="text"
          value={values.accountName}
          onChange={handleChange('accountName')}
        >
          Account name
        </BorderedInput>
      </Row>
      <Row style={{ marginBottom: '4px' }}>
        <BorderedInput
          type="text"
          value={values.bankName}
          onChange={handleChange('bankName')}
        >
          Bank name
        </BorderedInput>
      </Row>
      <Row>
        <Col width="50%">
          <BorderedInput
            type="text"
            value={values.startingBalance}
            onChange={handleChange('startingBalance')}
            withPrefix
            prefix="$"
          >
            Starting Balance
          </BorderedInput>
        </Col>
        <Col width="50%" style={{ position: 'relative' }}>
          <AccountTypeToggle value={values.type} onChange={handleChange('type')} />
        </Col>
      </Row>
    </>
  );
}

export default AddAccountForm;
