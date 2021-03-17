import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  display: table-header-group;
`;

export const TableRow = styled.tr`
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;
`;

type CellProps = {
  align?: 'right' | 'left' | 'middle';
  bold?: boolean;
};

export const Header = styled.th<CellProps>`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  line-height: 1.5rem;
  text-align: ${({ align }) => align || 'left'};
  padding: 1rem;
  /* Apply these styles below to normal table-cells as well */
  display: table-cell;
  font-size: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkThree};
  letter-spacing: 0.01071em;
  vertical-align: inherit;

  & .align-right {
    text-align: right;
  }
`;

export const TableBody = styled.tbody`
  display: table-row-group;
`;

export const TableCell = styled.td<CellProps>`
  display: table-cell;
  padding: 16px;
  font-size: 0.875rem;
  text-align: ${({ align }) => align || 'left'};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  line-height: 1.43;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkThree};
  letter-spacing: 0.01071em;
  vertical-align: inherit;

  & .number {
    font-weight: 700;
    text-align: right;
  }
`;
