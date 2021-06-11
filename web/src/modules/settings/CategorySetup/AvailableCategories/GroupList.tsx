import React from 'react';
import type { Group } from '../defaultCategories';
import { GroupHeading, GroupListContainer, List, ListItem } from './style';
type Props = {
  data: Group;
};

function GroupList({ data }: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <GroupListContainer>
      <GroupHeading onClick={() => setIsExpanded(!isExpanded)}>
        <h4>{data.groupName}</h4>
      </GroupHeading>
      <List>
        {isExpanded
          ? data.categories.map((category) => (
              <ListItem key={category.name}>{category.name}</ListItem>
            ))
          : null}
      </List>
    </GroupListContainer>
  );
}

export default GroupList;
