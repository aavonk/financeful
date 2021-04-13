import { Account } from '@Generated/graphql';
import { AccountItemBox, ItemName, MenuContainer } from './style';
import { capitalizeFirstLetter } from '@Lib/string-formating';
import { VerticalMenuIcon } from '@Common/Icons';
import IconDropdown from '@Common/IconDropdown';
function AccountItem({ account }: { account: Account }) {
  return (
    <AccountItemBox>
      {/* name */}
      <ItemName>
        <p>Nickname</p>
        <p>{account.accountName}</p>
      </ItemName>
      <ItemName>
        <p>Bank</p>
        <p>Chase</p>
      </ItemName>
      <ItemName>
        <p>Account type</p>
        <p>{capitalizeFirstLetter(account.accountType!)}</p>
      </ItemName>
      <ItemName>
        <p>Current balance</p>
        <p>$1,345.78</p>
      </ItemName>
      <MenuContainer>
        <IconDropdown
          icon={<VerticalMenuIcon />}
          items={[]}
          id="account-actions"
          ariaText="Account Actions"
          variant="small"
        />
      </MenuContainer>
    </AccountItemBox>
  );
}

export default AccountItem;
