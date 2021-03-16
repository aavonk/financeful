import React, { useRef, useCallback, useEffect, useState } from 'react';
import { StyledUl } from './style';

interface DropdownProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (val: boolean) => void;
  id?: string;
  children: React.ReactNode;
  margin?: string | null;
  className?: string;
  ariaLabeledBy?: string;
}
function Dropdown({
  open,
  setOpen,
  id,
  children,
  margin,
  className,
  ariaLabeledBy,
  ...props
}: DropdownProps) {
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const closeMenu = useCallback(
    (e) => {
      if (menuRef?.current && menuRef.current.contains(e.target)) {
        return;
      }

      if (menuRef?.current && !isMounted) {
        setOpen(false);
        document.removeEventListener('mousedown', closeMenu);
      }
    },
    [setOpen],
  );

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      document.addEventListener('mousedown', closeMenu);
    }

    return () => setIsMounted(false);
  }, [closeMenu, open]);
  return (
    <StyledUl
      $open={open}
      {...props}
      aria-hidden={!open}
      aria-labelledby={ariaLabeledBy}
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

export default Dropdown;
