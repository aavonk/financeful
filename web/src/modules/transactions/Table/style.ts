import styled, { css } from 'styled-components';

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;
  margin-top: 8rem;
`;

type ResponsiveProps = {
  $stackedDisplay?: boolean;
};

export const TableRoot = styled.table<ResponsiveProps>`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;

  & > .hide-small {
    display: none !important;
  }

  // Responsive sizes for mobile
  ${(props) =>
    props.$stackedDisplay &&
    css`
  @media screen and (max-width: 600px) {
    border: 0;
    & thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    & tr {
      border-bottom: 3px solid ${({ theme }) => theme.colors.darkThree};
      display: block;
      margin-bottom: 0.625em;
    }

    & td {
      /* border-bottom: 1px solid ${({ theme }) => theme.colors.darkThree}; */
      display: block;
      font-size: 0.8em;
      text-align: left !important;
      max-width: 100%;
    }

    & td.number,
    div.number {
      text-align: left !important;
    }

    td:last-child {
      border-bottom: 0;
    }


  `}
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

  @media ${({ theme }) => theme.device.mobile} {
    & .hide-small {
      display: none !important;
    }
  }
`;

export const TableBody = styled.tbody`
  display: table-row-group;
`;

export const TableCell = styled.td`
  display: table-cell;
  padding: 0.45rem;
  font-size: 0.725rem;
  text-align: left;
  font-weight: 400;
  line-height: 1.43;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkThree};
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  & .number {
    font-weight: 600;
    text-align: right;
  }

  @media ${({ theme }) => theme.device.mobile} {
    & .hide-small {
      display: none !important;
    }
  }
`;

export const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
