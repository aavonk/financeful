import React, { useState, useContext, createContext, useMemo, useCallback } from 'react';
import { ApolloError } from '@apollo/client';
import IconButton from '@Common/IconButton';
import { CloseIcon } from '@Common/Icons';
import ToggleSwitch from '@Common/ToggleSwitch';

import { Header, Title as StyledTitle, HeaderLeft, HeaderRight } from '../style';
import FormLoader from '@Components/FormSkeletons/FormLoader';
import { ViewError } from '@Components/ErrorViews';

interface ContextType {
  showPayment: boolean;
  toggle: () => void;
  loading: boolean;
  fetchError: ApolloError | undefined;
}

const FormContext = createContext<ContextType | undefined>(undefined);

function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used withing TransactionForm Provider');
  }
  return context;
}

interface StaticComponents {
  Title: React.FC<TitleProps>;
  Payment: React.FC;
  Transfer: React.FC;
  Loader: React.FC;
  ErrorView: React.FC;
}

interface FormProps {
  isFetchingData: boolean;
  fetchError: ApolloError | undefined;
}

const Form: React.FC<FormProps> & StaticComponents = ({
  children,
  isFetchingData,
  fetchError,
}) => {
  const [showPayment, setShowPayment] = useState(true);

  const toggle = useCallback(() => {
    setShowPayment((old) => !old);
  }, []);

  const value = useMemo(
    () => ({ showPayment, toggle, loading: isFetchingData, fetchError }),
    [isFetchingData, fetchError, showPayment, toggle],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

//-----------------------------------------------------------------------------

interface TitleProps {
  onClose: () => void;
}
const Title: React.FC<TitleProps> = ({ onClose }) => {
  const { showPayment, toggle } = useFormContext();

  return (
    <Header>
      <HeaderLeft>
        <IconButton blue small onClick={onClose} ariaText="Close">
          <CloseIcon />
        </IconButton>
        <StyledTitle>{showPayment ? 'Add transaction' : 'Add transfer'}</StyledTitle>
      </HeaderLeft>
      <HeaderRight>
        <ToggleSwitch
          ariaLabel={showPayment ? 'Show transfer' : 'Show transaction'}
          checked={!showPayment}
          onChange={toggle}
          uncheckedLabel="Transfer"
          checkedLabel="Transaction"
        />
      </HeaderRight>
    </Header>
  );
};

//------------------------------------------------------------------------------

const Loader: React.FC = () => {
  const { loading } = useFormContext();
  return <>{loading ? <FormLoader /> : null}</>;
};

//------------------------------------------------------------------------------

const ErrorView: React.FC = () => {
  const { fetchError } = useFormContext();

  if (!fetchError) {
    return null;
  }

  return (
    <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <ViewError
        reload
        subheading="We ran into trouble loading your accounts and categories. If you think something has gone wrong, please contact us."
      />
    </div>
  );
};

//------------------------------------------------------------------------------

const Payment: React.FC = ({ children }) => {
  const { showPayment, loading, fetchError } = useFormContext();

  if (loading || fetchError) {
    return null;
  }

  return <>{showPayment ? children : null}</>;
};

//------------------------------------------------------------------------------

const Transfer: React.FC = ({ children }) => {
  const { showPayment, loading, fetchError } = useFormContext();

  if (loading || fetchError) {
    return null;
  }
  return <>{showPayment ? null : children}</>;
};

//------------------------------------------------------------------------------

Form.Title = Title;
Form.Payment = Payment;
Form.Transfer = Transfer;
Form.Loader = Loader;
Form.ErrorView = ErrorView;

export { Form };
