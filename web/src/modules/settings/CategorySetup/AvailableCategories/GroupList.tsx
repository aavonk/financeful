import React from 'react';
import { GroupHeading, GroupListContainer, List, ListItem } from './style';
import type { Group } from '../defaultCategories';
import Button from '@Common/Button';

type Props = {
  data: Group;
};

function GroupList({ data }: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);

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
                <Button variant="cubed" onClick={() => console.log(category)}>
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
