import styled from 'styled-components';

export const TableRoot = styled.table`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  display: table-header-group;
  white-space: nowrap;
`;

export const TableRow = styled.tr`
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;

  & > th.amount-header {
    display: flex !important;
    flex-direction: row-reverse !important;
  }
`;

export const Header = styled.th`
  /* color: ${({ theme }) => theme.colors.textPrimary};
   */
  color: #fdfdfd;
  font-weight: 500;
  line-height: 1.5rem;
  text-align: left;
  padding: 1rem;
  /* Apply these styles below to normal table-cells as well */
  display: table-cell;
  font-size: 0.875rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkThree};
  letter-spacing: 0.01071em;
  vertical-align: inherit;

  & .align-right {
    text-align: right;
  }

  & > span > svg {
    color: ${({ theme }) => theme.colors.textSecondary};
    vertical-align: middle;
    font-size: 1.375rem;
    font-weight: bold;
  }
`;

export const TableBody = styled.tbody`
  display: table-row-group;
`;

export const TableCell = styled.td`
  display: table-cell;
  padding: 16px;
  font-size: 0.825rem;
  text-align: left;
  font-weight: 400;
  line-height: 1.43;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkThree};
  letter-spacing: 0.01071em;
  vertical-align: inherit;

  & .number {
    font-weight: 700;
    text-align: right;
  }
`;