import React from 'react';

/**
 This component is shows as a full replacement for the entire app in 
 production whenever an error happens that would otherwise crash
 the app, and is intended to be placed as the FallbackComponent
 of the most top-level ErrorBoundary
 */

import { FullBlueScreen } from './style';
import ViewError from './ViewError';

function BlueScreen() {
  return (
    <FullBlueScreen>
      <ViewError
        heading="Oh no! Something went wrong"
        subheading="Sorry about the technical issues. Please contact us so we can resolve the problem."
        emoji="🤬"
        reload
        whiteText
      />
    </FullBlueScreen>
  );
}

export default BlueScreen;
