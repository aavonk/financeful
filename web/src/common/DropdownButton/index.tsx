import '@reach/menu-button/styles.css';
import { Menu } from '@reach/menu-button';
import { StyledMenuButton, StyledMenuList, StyledMenuItem } from './style';

type Props = {
  selected: string;
  id: string;
  items: Array<{ label: string; onSelect: () => void }>;
};

function Dropdown({ selected, items, id }: Props) {
  return (
    <Menu>
      <StyledMenuButton id={id}>{selected}</StyledMenuButton>
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
