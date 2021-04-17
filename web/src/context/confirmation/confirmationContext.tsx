import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  ReactNode,
} from 'react';

import ConfirmationAlert from '@Components/Confirmation';

interface ConfirmationOptions {
  title: string;
  description: string;
  dangerButtonText: string;
  catchOnCancel?: boolean;
}

const ConfirmationContext = createContext<
  (options: ConfirmationOptions) => Promise<boolean>
>(Promise.reject);

export function useConfirmation() {
  const context = useContext(ConfirmationContext);

  if (!context) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider');
  }

  return context;
}

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [confirmationState, setConfirmationState] = useState<ConfirmationOptions | null>(
    null,
  );

  const awaitingPromiseRef = useRef<{
    resolve: (value: boolean) => void;
    reject: (value: boolean) => void;
  }>();

  const openConfirmation = (options: ConfirmationOptions) => {
    setConfirmationState(options);
    return new Promise<boolean>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (confirmationState?.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject(false);
    }
    setConfirmationState(null);
  };

  const handleConfirm = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve(true);
    }

    setConfirmationState(null);
  };

  return (
    <ConfirmationContext.Provider value={openConfirmation}>
      {children}
      <ConfirmationAlert
        confirmButtonText={confirmationState?.dangerButtonText || ''}
        message={confirmationState?.description || ''}
        heading={confirmationState?.title || ''}
        isOpen={Boolean(confirmationState)}
        onConfirmation={handleConfirm}
        onCancel={handleClose}
      />
    </ConfirmationContext.Provider>
  );
}
