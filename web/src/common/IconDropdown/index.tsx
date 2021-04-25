import * as React from 'react';
import { Menu } from '@reach/menu-button';
import VisuallyHidden from '@reach/visually-hidden';
import '@reach/menu-button/styles.css';
import Badge from '@Common/Badge';
import { StyledMenuButton, StyledMenuList, StyledMenuItem } from './style';

export type DropdownItems = Array<{
  icon?: React.ReactNode;
  iconVariant?: 'danger' | 'muted';
  label: string;
  onSelect: () => void;
}>;

type Props = {
  icon: React.ReactNode;
  withBadge?: boolean;
  badgeContent?: string | number;
  id: string;
  items: DropdownItems;
  ariaText: string;
  variant?: 'small';
  'data-testid'?: string;
};

/* children : [
  {
    icon?: <Icon />,
    label: "Some Text"
    onClick: () => void
  }
]

*/

function IconDropdown({
  icon,
  withBadge,
  badgeContent,
  items,
  id,
  ariaText,
  variant,
  ...props
}: Props) {
  return (
    <Menu data-testid={props['data-testid']}>
      {withBadge && badgeContent ? (
        <Badge badgeContent={badgeContent}>
          <StyledMenuButton $grey id={id} variant={variant}>
            <VisuallyHidden>{ariaText}</VisuallyHidden>
            {icon}
          </StyledMenuButton>
        </Badge>
      ) : (
        <StyledMenuButton $grey id={id} variant={variant}>
          <VisuallyHidden>{ariaText}</VisuallyHidden>
          {icon}
        </StyledMenuButton>
      )}

      <StyledMenuList>
        {items.map((child, index) => (
          <StyledMenuItem
            key={index}
            onSelect={child.onSelect}
            $iconVariant={child.iconVariant}
          >
            {child.icon ? (
              <>
                <i>{child.icon}</i>
                <span>{child.label}</span>
              </>
            ) : (
              <span>{child.label}</span>
            )}
          </StyledMenuItem>
        ))}
      </StyledMenuList>
    </Menu>
  );
}

export default IconDropdown;
