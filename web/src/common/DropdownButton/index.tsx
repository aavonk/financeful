import '@reach/menu-button/styles.css';
import { Menu } from '@reach/menu-button';
import { StyledMenuButton, StyledMenuList, StyledMenuItem } from './style';

export type DropdownItems = Array<{ label: string; onSelect: () => void }>;

type DropdownProps = {
  selected: string;
  id: string;
  items: DropdownItems;
  small?: boolean;
};

function Dropdown({ selected, items, id, small }: DropdownProps) {
  return (
    <Menu>
      <StyledMenuButton id={id} $small={small}>
        {selected}
      </StyledMenuButton>
      <StyledMenuList>
        {items.map((item, index) => (
          <StyledMenuItem key={index} onSelect={item.onSelect}>
            {item.label}
          </StyledMenuItem>
        ))}
      </StyledMenuList>
    </Menu>
  );
}

export default Dropdown;
