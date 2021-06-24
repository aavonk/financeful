import styled from 'styled-components';

export const TableRoot = styled.table`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: separate;

  th:first-child {
    border-top-left-radius: 6px;
  }

  th:last-child {
    border-top-right-radius: 6px;
  }

  th {
    background: ${({ theme }) => theme.colors.darkTwo};
  }
`;

export const TableHead = styled.thead`
  /* background-color: ${({ theme }) => theme.colors.primary}; */
  display: table-header-group;
  white-space: nowrap;
`;

export const TableRow = styled.tr`
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;
`;

export const Header = styled.th`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  line-height: 1.43rem;
  text-align: left;
  /* padding: 2px 8px; */
  padding: 0.25rem 0.45rem;
  /* Apply these styles below to normal table-cells as well */
  display: table-cell;
  font-size: 0.875rem;
  letter-spacing: 0.01071em;
  vertical-align: inherit;
`;

export const TableBody = styled.tbody`
  display: table-row-group;
`;

export const TableCell = styled.td`
  display: table-cell;
  padding: 0.45rem;
  font-size: 0.825rem;
  text-align: left;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BoldCell = styled.td`
  font-size: 0.825rem;
  font-weight: 600;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: table-cell;
  padding: 0.25rem 0.45rem;
`;

export const NestedCell = styled.span`
  padding-left: 40px;
`;

export const GroupHeading = styled.span`
  font-weight: 600;
  padding-left: 0;
`;
