import * as React from 'react';

import Button from '../../components/Button';
import Text from '../../components/Text';
import Window from '../../components/Window';

export interface Props {
  onClose: () => void;
}

export default function Error({ onClose }: Props) {
  return (
    <Window width={600}>
      <Window.Content>
        <Text value="Cannot create an element at the given location." />
      </Window.Content>
      <Window.Footer>
        <Button onClick={onClose} secondary>
          <Text value="Cancel" />
        </Button>
      </Window.Footer>
    </Window>
  );
}
