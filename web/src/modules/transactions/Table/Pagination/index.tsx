import React from 'react';
import { TableInstance } from 'react-table';
import { Container, PageCountWrapper, ActionsWrapper, Actions, Text } from './style';
import DropdownButton, { DropdownItems } from '@Common/DropdownButton';
import { useTableContext } from '@Context/react-table/reactTableContext';

function TablePagination() {
  const {
    pageOptions,
    gotoPage,
    state: { pageIndex },
  } = useTableContext();

  const pageItems: DropdownItems = pageOptions.map((page) => ({
    label: `Page ${page + 1}`,
    onSelect: () => gotoPage(page),
  }));

  return (
    <Container>
      <PageCountWrapper>
        <Text>
          Viewing page {pageIndex + 1} of {pageOptions.length}
        </Text>
      </PageCountWrapper>
      <ActionsWrapper>
        <Actions>
          <DropdownButton
            selected={`Page ${pageIndex + 1}`}
            id="transaction-page"
            items={pageItems}
          />
        </Actions>
      </ActionsWrapper>
    </Container>
  );
}

export default TablePagination;
