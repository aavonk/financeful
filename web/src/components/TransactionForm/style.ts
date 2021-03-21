import styled from 'styled-components';
import { DialogOverlay, DialogContent } from '@reach/dialog';

export const Overlay = styled(DialogOverlay)`
  background: rgba(91, 112, 131, 0.35);
  z-index: 1200;
`;

export const Content = styled(DialogContent)`
  background: ${({ theme }) => theme.colors.darkTwo};
  border-radius: 1rem;
  padding: 0.25rem 1rem;
`;

export const Header = styled.div`
  height: 53px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkThree};
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  line-height: 24px;
  font-weight: 700;
  margin-left: 1.25rem;
`;

export const Body = styled.div`
  display: flex;
`;
