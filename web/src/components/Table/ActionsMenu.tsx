import IconDropdown, { DropdownItems } from '@Common/IconDropdown';
import { VerticalMenuIcon, InfoIcon, ErrorIcon } from '@Common/Icons';
import { AlignRight } from './style';
import { useDeleteTransactionMutation, Transaction } from '@Generated/graphql';

function ActionsMenu({ transaction }: { transaction: Transaction }) {
  const [deleteTransactionMutation] = useDeleteTransactionMutation();

  const { id } = transaction;

  const items: DropdownItems = [
    {
      label: 'Delete transaction',
      icon: <ErrorIcon />,
      iconVariant: 'danger',
      onSelect: async () => {
        try {
          const response = await deleteTransactionMutation({
            variables: { id },
            update: (cache, { data: deleteTransaction }) => {
              cache.modify({
                id: cache.identify(transaction),
                fields: {
                  getTransactions(
                    existingTransactions: Transaction[],
                    { readField },
                  ) {
                    return existingTransactions.filter(
                      (ref: Transaction) => id !== readField('id', ref),
                    );
                  },
                },
              });
            },
          });
          console.log(response);
        } catch (err) {
          console.error(err);
        }
      },
    },
    {
      label: 'Edit details',
      icon: <InfoIcon />,
      iconVariant: 'muted',
      onSelect: () => console.log('ok'),
    },
  ];
  return (
    <AlignRight>
      <IconDropdown
        icon={<VerticalMenuIcon />}
        items={items}
        id="actions-menu"
        ariaText="Actions"
        variant="small"
      />
    </AlignRight>
  );
}

export default ActionsMenu;
