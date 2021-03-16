import * as React from 'react';
import { Menu } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import Badge from '@Common/Badge';
import { StyledMenuButton, StyledMenuList, StyledMenuItem } from './style';

type Props = {
  icon: React.ReactNode;
  withBadge?: boolean;
  badgeContent?: string | number;
  items: Array<{
    icon?: React.ReactNode;
    label: string;
    onSelect: () => void;
  }>;
};

/* children : [
  {
    icon?: <Icon />,
    label: "Some Text"
    onClick: () => void
  }
]

*/

function IconDropdown({ icon, withBadge, badgeContent, items }: Props) {
  return (
    <Menu>
      {withBadge && badgeContent ? (
        <Badge badgeContent={badgeContent}>
          <StyledMenuButton $grey>{icon}</StyledMenuButton>
        </Badge>
      ) : (
        <StyledMenuButton $grey>{icon}</StyledMenuButton>
      )}

      <StyledMenuList>
        {items.map((child, index) => (
          <StyledMenuItem key={index} onSelect={child.onSelect}>
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
