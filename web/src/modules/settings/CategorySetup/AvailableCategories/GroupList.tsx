import React from 'react';
import { useCreateCategory } from '../../mutations/useCreateCategory';
import { GroupHeading, GroupListContainer, List, ListItem } from './style';
import { CategoryCreateInput } from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import type { Group } from '../defaultCategories';
import Button from '@Common/Button';

type Props = {
  data: Group;
};

function GroupList({ data }: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { mutate: createCategory, loading } = useCreateCategory();
  const { showAlert } = useAlert();

  const handleAddCategory = async (category: CategoryCreateInput) => {
    try {
      const res = await createCategory({ variables: { input: category } });
      const categorySuccess = res.data?.createCategory.category;
      const error = res.data?.createCategory.error;

      if (categorySuccess) {
        showAlert(`${categorySuccess.name} successfully added`, 'info');
      }

      if (error) {
        showAlert(error.message, 'error', 5000);
      }
    } catch (err) {
      showAlert('We ran into a problem. Try again?', 'error', 7000);
    }
  };

  return (
    <GroupListContainer>
      <GroupHeading isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
        <h4>{data.groupName}</h4>
      </GroupHeading>
      <List>
        {isExpanded
          ? data.categories.map((category) => (
              <ListItem key={category.name}>
                <span>{category.name}</span>
                <Button variant="cubed" onClick={() => handleAddCategory(category)}>
                  +
                </Button>
              </ListItem>
            ))
          : null}
      </List>
    </GroupListContainer>
  );
}

export default GroupList;
