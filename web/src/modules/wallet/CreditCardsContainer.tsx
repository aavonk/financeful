import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { useGetAccountsQuery } from '@Generated/graphql';
import CreditCard from '@Components/CreditCard';
import CardLoader from '@Components/CreditCard/CardLoader';
import AccountOverviewModal from './AccountOverview/Modal';
import Toast from '@Common/Alerts/Toast';

type GridProps = { shouldFlex?: boolean };

const GridView = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px 10px;
  justify-items: start;
  @media (min-width: 768px) {
    justify-items: center;
  }

  ${({ shouldFlex }) =>
    shouldFlex &&
    css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `}
`;

function CreditCardsContainer() {
  const arr = new Array(4).fill(undefined).map((val, idx) => idx);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: accounts, loading: fetchingAccounts, error } = useGetAccountsQuery({
    variables: { filter: { isInactive: true } },
  });

  if (fetchingAccounts) {
    return (
      <GridView>
        {arr.map((item, index) => (
          <CardLoader key={index} />
        ))}
      </GridView>
    );
  }

  if (error) {
    return (
      <Toast
        type="error"
        message="There was an error fetching your card data."
        timeout={10000}
      />
    );
  }

  if (!accounts || !accounts.getAccounts) {
    return null;
  }
  return (
    <GridView shouldFlex={accounts.getAccounts.length < 4}>
      <AnimatePresence initial={true}>
        {accounts.getAccounts.slice(0, 4).map((account, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, zIndex: 20 }}
            whileTap={{ scale: 0.9 }}
            style={{ cursor: 'pointer', height: 'fit-content' }}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={() => setDialogOpen(true)}
          >
            <CreditCard account={account} />
          </motion.div>
        ))}
      </AnimatePresence>
      <AccountOverviewModal isOpen={dialogOpen} onDismiss={() => setDialogOpen(false)}>
        <div>Acocunt name and balance</div>
        <div> Area chart with 3-6 months baance history</div>
        <div>recent transactions</div>
      </AccountOverviewModal>
    </GridView>
  );
}

export default CreditCardsContainer;