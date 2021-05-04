import { Container, StyledPaper } from './style';
import { Account } from '@Generated/graphql';
import AccountListHeader from './AccountListHeader';
import AccountItem from './AccountItem';
import EmptyView from '@Components/EmptyViews/GeneralEmptyView';
import AccountActions from './AccountActions';
import { IAccountActions } from './AccountActions';
type IAccountList = {
  accounts: Account[] | undefined;
} & IAccountActions;

function AccountList({
  accounts,
  onEditClick,
  onDeleteClick,
  onMarkInactiveClick,
}: IAccountList) {
  return (
    <StyledPaper>
      <Container>
        <AccountListHeader />
        {accounts?.length ? (
          accounts.map((account: Account) => (
            <AccountItem key={account.id} account={account}>
              <AccountActions
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
                account={account}
                onMarkInactiveClick={onMarkInactiveClick}
              />
            </AccountItem>
          ))
        ) : (
          <EmptyView
            heading="You haven't added any accounts yet"
            subheading="When you do, you'll see them here."
            containerHeight="300px"
          />
        )}
      </Container>
    </StyledPaper>
  );
}

export default AccountList;
