import { useState } from 'react';
import CreditCard from '@Components/CreditCard';
import CardLoader from '@Components/CreditCard/CardLoader';
import { AnimatePresence, motion } from 'framer-motion';
import AccountOverviewModal from './AccountOverview/Modal';
function CreditCardsContainer() {
  const arr = new Array(8).fill(undefined).map((val, idx) => idx);
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <AnimatePresence initial={true}>
        {arr.slice(0, 4).map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, zIndex: 20 }}
            whileTap={{ scale: 0.9 }}
            style={{ cursor: 'pointer', height: 'fit-content' }}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={() => setDialogOpen(true)}
          >
            <CardLoader />
          </motion.div>
        ))}
      </AnimatePresence>
      <AccountOverviewModal isOpen={dialogOpen} onDismiss={() => setDialogOpen(false)}>
        <div>Acocunt name and balance</div>
        <div> Area chart with 3-6 months baance history</div>
        <div>recent transactions</div>
      </AccountOverviewModal>
    </>
  );
}

export default CreditCardsContainer;
