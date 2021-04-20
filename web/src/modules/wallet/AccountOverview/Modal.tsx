import { ReactNode } from 'react';
import styled from 'styled-components';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)<HTMLMotionProps<'div'>>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 5000;
`;

const Container = styled(motion.div)<HTMLMotionProps<'div'>>`
  width: 50%;
  height: 50%;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
`;

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const containerVariant = {
  initial: { top: '-50%', transition: { type: 'spring', stiffness: 300, damping: 35 } },
  isOpen: { top: '50%' },
  exit: { top: '-50%' },
};

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  children: ReactNode;
};

function AccountOverviewModal({ isOpen, onDismiss, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <Overlay
          initial={'initial'}
          animate={'isOpen'}
          exit={'exit'}
          variants={modalVariant}
          onClick={onDismiss}
        >
          <Container variants={containerVariant}>{children}</Container>
        </Overlay>
      ) : null}
    </AnimatePresence>
  );
}

export default AccountOverviewModal;
