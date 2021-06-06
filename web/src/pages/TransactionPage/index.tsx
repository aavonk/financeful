import React, { useMemo, useEffect, useReducer } from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { Column, Cell } from 'react-table';
import { Transaction } from '@Generated/graphql';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import { format } from 'date-fns';
import { TableError } from '@Components/ErrorViews';
import { ErrorBoundary } from 'react-error-boundary';
import { TableContainer } from './style';
import { ContentContainer, Left, Right } from '@Components/Layout/styles';

import { ReactTableProvider } from '@Context/react-table/reactTableContext';
import {
  TransactionTypeCell,
  TablePagination,
  ActionsContainer,
  Toolbar,
} from '@Modules/transactions/Table';
import { ActivityContainer } from '@Modules/transactions/ActivityBar';
import SelectTypeFilter from '@Modules/transactions/Table/Toolbar/SelectTypeFilter';
import TransactionsLoadingView from './TransactionsLoadingView';
import { transactionsReducer } from './transactionsPageReducer';
import { DefaultView, ReviewView } from './views';

import type { State } from './transactionsPageReducer';

const initialState: State = {
  selectedTransaction: null,
  isEditModalOpen: false,
  isSubrouteShown: false,
  isDefaultViewLoading: true,
  data: [],
};

function TransactionPage() {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const [state, dispatch] = useReducer(transactionsReducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'SUBROUTE_SHOWN',
      payload: pathname === '/transactions/uncategorized',
    });
  }, [pathname]);

  const columns = useMemo<Column<Record<string, unknown>>[]>(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }: Cell<Transaction>) => {
          return <span>{format(new Date(value), 'MMM do y')}</span>;
        },
        Filter: SelectTypeFilter,
        disableFilters: true,
      },

      {
        Header: 'Payee',
        accessor: 'payee',
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
      {
        Header: () => <span className="align-right">Amount</span>,
        accessor: 'amount',
        Cell: ({ value }: Cell<Transaction>) => {
          return <div className="number">{formatMoneyFromCentsToDollars(value)}</div>;
        },
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
      {
        Header: 'Category',
        accessor: 'category.name',
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value }: Cell<Transaction>) => {
          return <TransactionTypeCell type={value} />;
        },
        Filter: SelectTypeFilter,
        filter: 'includes',
      },
      {
        Header: 'Account',
        accessor: 'account.accountName',
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
    ],
    [],
  );

  return (
    <ReactTableProvider
      withPagination={true}
      columns={columns}
      data={state.data as Record<string, unknown>[]}
    >
      <ActionsContainer
        isModalOpen={state.isEditModalOpen}
        transaction={state.selectedTransaction}
        dispatch={dispatch}
      />
      <Toolbar hide={state.isSubrouteShown} />
      <ContentContainer>
        <Left>
          <TableContainer>
            <ErrorBoundary FallbackComponent={TableError}>
              <div style={{ width: '100%', maxHeight: '680px', overflowY: 'auto' }}>
                <Switch>
                  <Route exact path={path}>
                    <DefaultView dispatch={dispatch} state={state} />
                  </Route>
                  <Route path={`${path}/uncategorized`}>
                    <ReviewView dispatch={dispatch} />
                  </Route>
                </Switch>
              </div>
              <TablePagination hide={state.isSubrouteShown} />
            </ErrorBoundary>
          </TableContainer>
        </Left>
        <Right>
          <ActivityContainer disableSearch={state.isSubrouteShown} />
        </Right>
      </ContentContainer>
    </ReactTableProvider>
  );
}

export default TransactionPage;
