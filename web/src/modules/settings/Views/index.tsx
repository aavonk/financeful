import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Categories from './Categories';

function SettingsViews() {
  return (
    <Switch>
      <Route exact path="/settings/profile">
        {' '}
        Profile Settings
      </Route>
      <Route exact path="/settings/bank-accounts">
        Bank Accounts{' '}
      </Route>
      <Route exact path="/settings/categories">
        <Categories />
      </Route>
      <Route exact path="/settings/security">
        Security Settings
      </Route>
    </Switch>
  );
}

export default SettingsViews;
