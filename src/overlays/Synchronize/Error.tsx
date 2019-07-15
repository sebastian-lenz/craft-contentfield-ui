import * as React from 'react';

import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Window from '../../components/Window';

export interface Props {
  message?: string;
  onClose: () => void;
}

export default function Error({ message, onClose }: Props) {
  return (
    <>
      <Window.Content>
        <div className="tcfSynchronize--message">
          <Icon
            className="tcfSynchronize--messageIcon error"
            name="material:error"
            size="huge"
          />

          <div className="tcfSynchronize--title">An error has occured</div>
          {message ? (
            <div className="tcfSynchronize--message">{message}</div>
          ) : null}
        </div>
      </Window.Content>
      <Window.Footer>
        <Button onClick={onClose}>Close</Button>
      </Window.Footer>
    </>
  );
}
