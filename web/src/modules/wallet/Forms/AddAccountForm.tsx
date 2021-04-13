import { BorderedInput, ErrorMessage } from '@Common/FormElements';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';

type AddAccountProps = {
  onFormSubmit: () => void;
};

const initialState = {
  bankName: '',
};
function AddAccountForm({ onFormSubmit }: AddAccountProps) {
  return <div>Form</div>;
}

export default AddAccountForm;
