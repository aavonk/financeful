import React, { useState, useContext, createContext, useMemo } from 'react';
import IconButton from '@Common/IconButton';
import { CloseIcon } from '@Common/Icons';
import FormLoader from '../FormLoader';
import { Header, Title as StyledTitle, HeaderLeft } from '../style';

type PossibleFormViews = 'payment' | 'transfer';

interface ContextType {
  formToDisplay: PossibleFormViews;
  loading: boolean;
}

interface TitleProps {
  onClose: () => void;
}

const EditFormContext = createContext<ContextType | undefined>(undefined);

function useFormContext() {
  const context = useContext(EditFormContext);

  if (!context) {
    throw new Error(
      'useFormContext must be used within a FormProvider [EditPaymentForm]',
    );
  }

  return context;
}

interface StaticComponents {
  Transfer: React.FC;
  Payment: React.FC;
  Title: React.FC<TitleProps>;
  Loader: React.FC;
}

interface EditFormProps {
  paymentType: string;
  isFetchingData: boolean;
}

const EditForm: React.FC<EditFormProps> & StaticComponents = ({
  paymentType,
  children,
  isFetchingData,
}) => {
  const [formToDisplay] = useState<PossibleFormViews>(() => {
    return paymentType === 'TRANSFER' ? 'transfer' : 'payment';
  });

  const value = useMemo(() => ({ formToDisplay, loading: isFetchingData }), [
    formToDisplay,
    isFetchingData,
  ]);

  return <EditFormContext.Provider value={value}>{children}</EditFormContext.Provider>;
};
//---------------------------------------------------------------------------------
const Transfer: React.FC = ({ children }) => {
  const { formToDisplay, loading } = useFormContext();

  if (loading) {
    return null;
  }

  return <>{formToDisplay === 'transfer' ? children : null}</>;
};

//---------------------------------------------------------------------------------
const Payment: React.FC = ({ children }) => {
  const { formToDisplay, loading } = useFormContext();

  if (loading) {
    return null;
  }
  return <>{formToDisplay === 'payment' ? children : null}</>;
};

//---------------------------------------------------------------------------------
const Title: React.FC<TitleProps> = ({ onClose }) => {
  const { formToDisplay, loading } = useFormContext();

  if (loading) {
    return null;
  }

  return (
    <Header>
      <HeaderLeft>
        <IconButton blue small onClick={onClose} ariaText="Close">
          <CloseIcon />
        </IconButton>
        <StyledTitle>
          {formToDisplay === 'payment' ? 'Transaction Details' : 'Transfer Details'}
        </StyledTitle>
      </HeaderLeft>
    </Header>
  );
};

//------------------------------------------------------------------------------

const Loader: React.FC = () => {
  const { loading } = useFormContext();
  return <>{loading ? <FormLoader /> : null}</>;
};

EditForm.Transfer = Transfer;
EditForm.Payment = Payment;
EditForm.Title = Title;
EditForm.Loader = Loader;

export { EditForm };
