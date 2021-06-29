import React from 'react';
import { Overlay, Content, Body } from './style';
import type { DialogProps } from '@reach/dialog';

interface RootProps extends DialogProps {
  'aria-label': string;
}

export function ModalRoot(props: RootProps) {
  const { isOpen, initialFocusRef, children, onDismiss } = props;

  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss} initialFocusRef={initialFocusRef}>
      <Content aria-label={props['aria-label']}>{children}</Content>
    </Overlay>
  );
}

type BodyProps = {
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export function ModalBody({ style, children }: BodyProps) {
  return <Body style={style}>{children}</Body>;
}
