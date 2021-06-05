import React from 'react';
import styled from 'styled-components';
import {
  ContentContainer,
  Left as Right,
  Right as Left,
} from '@Components/Layout/styles';
import SettingsMenu from '@Modules/settings/SettingsMenu';
import SettingsViews from '@Modules/settings/Views';

function SettingsPage() {
  return (
    <Container>
      <Left>
        <SettingsMenu />
      </Left>
      <Right>
        <SettingsViews />
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
