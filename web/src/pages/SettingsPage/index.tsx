import React from 'react';
import styled from 'styled-components';
import {
  ContentContainer,
  Left as Right,
  Right as Left,
} from '@Components/Layout/styles';
import SettingsMenu from '@Modules/settings/SettingsMenu';

function SettingsPage() {
  return (
    <Container>
      <Left>
        <SettingsMenu />
      </Left>
      <Right>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti nesciunt eaque
        quas nam fugit libero nihil suscipit ullam saepe explicabo ducimus odit,
        temporibus animi quae laboriosam ad consectetur modi iste.
      </Right>
    </Container>
  );
}

export default SettingsPage;

const Container = styled(ContentContainer)`
  @media (max-width: 905px) {
    flex-direction: column;

    ${Left} {
      margin-bottom: 40px;
    }
  }
`;
