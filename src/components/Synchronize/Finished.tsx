import * as React from 'react';

import Button from '../Button';
import Icon from '../Icon';

export interface Props {
  onClose: () => void;
}

export default function Finished({ onClose }: Props) {
  return (
    <div className="tcfSynchronize--message">
      <Icon
        className="tcfSynchronize--messageIcon finished"
        name="material:check_circle"
        size="huge"
      />

      <div className="tcfSynchronize--title">Sites have been synchronized</div>
      <div className="tcfSynchronize--message">
        If you are not happy with the results, do not save the entry. Reload
        this page to revert all changes.
      </div>

      <div className="tcfSynchronize--actions">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
