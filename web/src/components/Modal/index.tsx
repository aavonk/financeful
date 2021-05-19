import React, { ReactNode, CSSProperties } from 'react';
import IconButton from '@Common/IconButton';
import { CloseIcon } from '@Common/Icons';
import { DialogProps } from '@reach/dialog';
import {
  Overlay,
  Header,
  HeaderLeft,
  HeaderRight,
  Body,
  Footer,
  Title,
  Content,
} from './style';

interface ModalProps extends DialogProps {
  ariaLabel: string;
}

export function ModalRoot(props: ModalProps) {
  const { children, isOpen, onDismiss, initialFocusRef, ariaLabel } = props;
  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss} initialFocusRef={initialFocusRef}>
      <Content aria-label={ariaLabel}>{children}</Content>
    </Overlay>
  );
}

type TitleProps = {
  title: string;
  onClose: () => void;
  splitHeader?: boolean;
  RightSideComponent?: ReactNode;
};
export function ModalTitle({
  title,
  onClose,
  splitHeader,
  RightSideComponent,
}: TitleProps) {
  return (
    <Header>
      <HeaderLeft>
        <IconButton
          blue
          small
          onClick={onClose}
          ariaText="Close"
          data-testid="close-modal-button"
        >
          <CloseIcon />
        </IconButton>
        <Title>{title}</Title>
      </HeaderLeft>
      {splitHeader ? <HeaderRight>{RightSideComponent}</HeaderRight> : null}
    </Header>
  );
}

export function ModalBody({
  children,
  overrideStyle,
}: {
  children: ReactNode;
  overrideStyle?: CSSProperties;
}) {
  return <Body style={overrideStyle}>{children}</Body>;
}

export function ModalActions({ children }: { children: ReactNode }) {
  return <Footer>{children}</Footer>;
}
