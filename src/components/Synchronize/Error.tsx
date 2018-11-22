import * as React from 'react';

import Button from '../Button';
import Icon from '../Icon';

export interface Props {
  message?: string;
  onClose: () => void;
}

export default function Error({ message, onClose }: Props) {
  return (
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

      <div className="tcfSynchronize--actions">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
