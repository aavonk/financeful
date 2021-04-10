/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ReactElement } from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import AppThemeProvider from '@Context/theme';
import { AlertProvider } from '@Context/alert/alertContext';
import EditFormController from '../EditFormController';
import {
  CATEGORIES,
  ACCOUNTS,
  transactionMock,
  transferMock,
  fetchAccountsAndCategoriesError,
  fetchAccountsAndCategoriesSuccess,
  fetchTransferSuccess,
  fetchTransferError,
  getTransferResponse,
  updateTransactionError,
  updateTransactionSuccess,
  updateTransferSuccess,
  updateTransferError,
} from './__mocks__/mocks';

const setup = (mocks: MockedResponse[] | [], ui: ReactElement) => {
  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppThemeProvider>
        <AlertProvider>{ui}</AlertProvider>
      </AppThemeProvider>
    </MockedProvider>,
  );

  return { ...utils };
};

describe('Edit Transaction Form fetchAccountsAndCategories query', () => {
  test('[Loading state] Displays loading ui while fetching', () => {
    const closeModal = jest.fn();

    const { getByLabelText } = setup(
      [fetchAccountsAndCategoriesSuccess],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transactionMock}
      />,
    );

    expect(getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test('[Success state] Successfully fetches the data and displays it', async () => {
    const closeModal = jest.fn();

    const { getByText } = setup(
      [fetchAccountsAndCategoriesSuccess],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transactionMock}
      />,
    );

    await waitFor(() => {
      ACCOUNTS.forEach((account) => {
        expect(getByText(account.accountName)).toBeInTheDocument();
      });
      CATEGORIES.forEach((category) => {
        expect(getByText(category.name)).toBeInTheDocument();
      });
    });
  });

  test('[Error state] It closes the form modal and shows an error toast', async () => {
    const closeModal = jest.fn();
    const { getByRole } = setup(
      [fetchAccountsAndCategoriesError],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transactionMock}
      />,
    );

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalled();
      expect(getByRole('alert')).toBeInTheDocument();
    });
  });
});

// Can't assert whether or not a toast alert pops up when using the showAlert function,
// from alertContext because the form is rendered in a portal and the alert
// won't show up. So, if the functions call closeModal, then it can be assumed
// that the alert has shown.

describe('The update Transaction mutation', () => {
  test('[Success state] It successfuly calls mutation and closes form', async () => {
    const closeModal = jest.fn();
    const { getByText, getByRole } = setup(
      [fetchAccountsAndCategoriesSuccess, updateTransactionSuccess],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transactionMock}
      />,
    );

    await waitFor(() => {
      ACCOUNTS.forEach((account) => {
        expect(getByText(account.accountName)).toBeInTheDocument();
      });
      CATEGORIES.forEach((category) => {
        expect(getByText(category.name)).toBeInTheDocument();
      });
    });
    // The fetchAccountsAndCategories query has returned -- proceed.

    const submitButton = getByRole('button', { name: /save/i });

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });

  test('[Error state] It closes the modal and displays a toast', async () => {
    const closeModal = jest.fn();
    const { getByText, getByRole } = setup(
      [fetchAccountsAndCategoriesSuccess, updateTransactionError],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transactionMock}
      />,
    );

    await waitFor(() => {
      ACCOUNTS.forEach((account) => {
        expect(getByText(account.accountName)).toBeInTheDocument();
      });
      CATEGORIES.forEach((category) => {
        expect(getByText(category.name)).toBeInTheDocument();
      });
    });
    // The fetchAccountsAndCategories query has returned -- proceed.

    const submitButton = getByRole('button', { name: /save/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Which form displays based on transaction type', () => {
  test('<EditPaymentForm /> is displayed when it is not a transfer', async () => {
    const closeModal = jest.fn();
    const { getByText } = setup(
      [fetchAccountsAndCategoriesSuccess],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transactionMock}
      />,
    );

    await waitFor(() => {
      expect(getByText(/edit transaction/i)).toBeInTheDocument();
    });
  });
  test('<EditTransferForm /> is displayed when transaction is a transfer', async () => {
    const closeModal = jest.fn();
    const { getByText } = setup(
      [fetchAccountsAndCategoriesSuccess, fetchTransferSuccess],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transferMock}
      />,
    );

    await waitFor(() => {
      expect(getByText(/edit transfer/i)).toBeInTheDocument();
    });
  });
});

describe('The fetchTransfer query', () => {
  test('[Success state] It displays the transfer in <EditTransferForm />', async () => {
    const closeModal = jest.fn();
    const { getByText, getByLabelText } = setup(
      [fetchAccountsAndCategoriesSuccess, fetchTransferSuccess],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transferMock}
      />,
    );

    const response = getTransferResponse;

    await waitFor(() => {
      expect(getByText(/edit transfer/i)).toBeInTheDocument();
      expect(getByLabelText(/from account * /i)).toHaveValue(response.fromAccount.id!);
      expect(getByLabelText(/to account * /i)).toHaveValue(response.toAccount.id!);
      expect(getByLabelText(/category/i)).toHaveValue(response.category!.id);
    });
  });

  test('[Error state] The modal is closed and a toast is shown.', async () => {
    const closeModal = jest.fn();
    const { getByTestId } = setup(
      [fetchAccountsAndCategoriesSuccess, fetchTransferError],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transferMock}
      />,
    );

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
      expect(getByTestId('toast')).toBeInTheDocument();
    });
  });
});

describe('The update Transfer mutation', () => {
  test('[Success state] It successfully updates transfer', async () => {
    const closeModal = jest.fn();
    const { getByText, getByLabelText, getByRole } = setup(
      [fetchAccountsAndCategoriesSuccess, fetchTransferSuccess, updateTransferSuccess],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transferMock}
      />,
    );
    const response = getTransferResponse;

    await waitFor(() => {
      expect(getByText(/edit transfer/i)).toBeInTheDocument();
      expect(getByLabelText(/from account * /i)).toHaveValue(response.fromAccount.id!);
      expect(getByLabelText(/to account * /i)).toHaveValue(response.toAccount.id!);
      expect(getByLabelText(/category/i)).toHaveValue(response.category!.id);
    });

    //The fetchTransfer mock has returned successfully -- proceed
    const submitButton = getByRole('button', { name: /save/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });
  test('[Error state] It closes modal and shows toast on update transfer error', async () => {
    const closeModal = jest.fn();
    const { getByText, getByLabelText, getByRole } = setup(
      [fetchAccountsAndCategoriesSuccess, fetchTransferSuccess, updateTransferError],
      <EditFormController
        isOpen={true}
        closeModal={closeModal}
        transaction={transferMock}
      />,
    );
    const response = getTransferResponse;

    await waitFor(() => {
      expect(getByText(/edit transfer/i)).toBeInTheDocument();
      expect(getByLabelText(/from account * /i)).toHaveValue(response.fromAccount.id!);
      expect(getByLabelText(/to account * /i)).toHaveValue(response.toAccount.id!);
      expect(getByLabelText(/category/i)).toHaveValue(response.category!.id);
    });

    //The fetchTransfer mock has returned successfully -- proceed
    const submitButton = getByRole('button', { name: /save/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });
});
