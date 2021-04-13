import { ReactElement, ReactNode } from 'react';
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

export function ModalRoot(props: DialogProps) {
  const { children, isOpen, onDismiss, initialFocusRef } = props;
  return (
    <Overlay isOpen={isOpen} onDismis={onDismiss} initialFocusRef={initialFocusRef}>
      <Content>{children}</Content>
    </Overlay>
  );
}

type TitleProps = {
  title: string;
  onClose: () => void;
  splitHeader?: boolean;
  RightSideComponent?: ReactElement;
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
        <IconButton blue small onClick={onClose} ariaText="Close">
          <CloseIcon />
        </IconButton>
        <Title>{title}</Title>
      </HeaderLeft>
      {splitHeader ? <HeaderRight>{RightSideComponent}</HeaderRight> : null}
    </Header>
  );
}

export function ModalBody({ children }: { children: ReactNode }) {
  return <Body>{children}</Body>;
}

export function ModalActions({ children }: { children: ReactNode }) {
  return <Footer>{children}</Footer>;
}
