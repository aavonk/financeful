import '@reach/menu-button/styles.css';
import { Menu } from '@reach/menu-button';
import { StyledMenuButton, StyledMenuList, StyledMenuItem } from './style';

export type DropdownItems = Array<{ label: string; onSelect: () => void }>;

type DropdownProps = {
  selected: string;
  id: string;
  items: DropdownItems;
  small?: boolean;
  'data-testid'?: string;
};

function Dropdown(props: DropdownProps) {
  const { selected, items, id, small } = props;
  return (
    <Menu>
      <StyledMenuButton id={id} $small={small} data-testid={props['data-testid']}>
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
