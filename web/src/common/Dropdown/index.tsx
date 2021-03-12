import React, { useRef, useCallback, useEffect } from 'react';
import { StyledUl } from './style';

interface DropdownProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (val: boolean) => void;
  id?: string;
  children: React.ReactNode;
  margin?: string | null;
  className?: string;
}

export function Dropdown({
  open,
  setOpen,
  id,
  children,
  margin,
  className,
  ...props
}: DropdownProps) {
  const menuRef = useRef<HTMLUListElement>(null);
  const closeMenu = useCallback(
    (e) => {
      if (menuRef?.current && menuRef.current.contains(e.target)) {
        return;
      }
      setOpen(false);
      document.removeEventListener('mousedown', closeMenu);
    },
    [setOpen],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', closeMenu);
    }
  }, [closeMenu, open]);
  return (
    <StyledUl
      $open={open}
      {...props}
      aria-hidden={!open}
      role="menu"
      id={id}
      $margin={margin}
      className={className}
      ref={menuRef}
    >
      {children}
    </StyledUl>
  );
}
