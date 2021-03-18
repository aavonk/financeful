import { SearchIcon } from '@Common/Icons';
import { SearchInput, SearchContainer } from './style';

function Searchbox() {
  return (
    <SearchContainer>
      <SearchInput placeholder="Search transactions..." />
      <SearchIcon />
    </SearchContainer>
  );
}

export default Searchbox;
