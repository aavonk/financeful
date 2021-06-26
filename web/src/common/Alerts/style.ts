import styled, { css } from 'styled-components';
import { IAlert } from '@Context/alert/alertContext';
import { motion, HTMLMotionProps } from 'framer-motion';

export const AlertRoot = styled.div<{ $type: IAlert['type'] }>`
  position: fixed;
  left: 50%;
  right: auto;
  bottom: 24px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #212121;
  z-index: 2500;
  color: #fff;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.43;
  padding: 6px 16px;
  border-radius: 4px;
  letter-spacing: 0.01071em;
  box-shadow: ${({ theme }) => theme.elevation.two};
  ${(props) =>
    props.$type === 'error' &&
    css`
      background-color: #f44336 !important;
    `}
  ${(props) =>
    props.$type === 'info' &&
    css`
      background-color: #2195f3 !important;
    `}
      ${(props) =>
    props.$type === 'success' &&
    css`
      background-color: #4caf50 !important;
    `}
`;

export const AlertIcon = styled.div`
  display: flex;
  opacity: 0.9;
  padding: 7px 0;
  font-size: 22px;
  margin-right: 12px;
`;

export const AlertMessage = styled.div`
  padding: 8px 0;
`;

export const MessageIcon = styled.div`
  display: flex;
  opacity: 0.9;
  padding: 7px 0;
  font-size: 22px;
  margin-right: 12px;

  & > svg {
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    flex-shrink: 0;
  }
`;

export const MessageText = styled.p`
  padding: 8px 0;

  & > span > a,
  > a {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
    color: inherit;
  }
`;

export type MessageRootVariants = 'info' | 'warning';

export type MessageRootProps = {
  $variant: MessageRootVariants;
};

type IMessageRoot = MessageRootProps & HTMLMotionProps<'div'>;

//TODO: Make the alert a motion.div and have it appear

export const MessageRoot = styled(motion.div)<IMessageRoot>`
  display: flex;
  padding: 6px 16px;
  font-size: 0.875rem;
  line-height: 1.43;
  border-radius: 6px;

  ${(props) =>
    props.$variant === 'info' &&
    css`
      color: rgb(166, 213, 250);
      background-color: rgb(3, 14, 24);
      ${MessageIcon} {
        color: ${({ theme }) => theme.colors.primary};
      }
    `}

  ${(props) =>
    props.$variant === 'warning' &&
    css`
      color: rgb(255, 213, 153);
      background-color: rgb(25, 15, 0);
      ${MessageIcon} {
        color: ##ff9800;
      }
    `}
`;
