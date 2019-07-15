import * as React from 'react';

import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Window from '../../components/Window';

export interface Props {
  onClose: () => void;
}

export default function Finished({ onClose }: Props) {
  return (
    <>
      <Window.Content>
        <div className="tcfSynchronize--message">
          <Icon
            className="tcfSynchronize--messageIcon finished"
            name="material:check_circle"
            size="huge"
          />

          <div className="tcfSynchronize--title">
            Sites have been synchronized
          </div>
          <div className="tcfSynchronize--message">
            If you are not happy with the results, do not save the entry. Reload
            this page to revert all changes.
          </div>
        </div>
      </Window.Content>
      <Window.Footer>
        <Button onClick={onClose}>Close</Button>
      </Window.Footer>
    </>
  );
}
