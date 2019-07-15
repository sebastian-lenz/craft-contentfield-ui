import * as React from 'react';

import ActivityIndicator from '../../components/ActivityIndicator';
import Window from '../../components/Window';

export default function Working() {
  return (
    <Window.Content>
      <div className="tcfSynchronize--working">
        <ActivityIndicator />
      </div>
    </Window.Content>
  );
}
