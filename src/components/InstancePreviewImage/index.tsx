import * as React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';

import { createPreview } from './factories';
import type { Model, RootState, Schema } from '../../store/models';

import './index.styl';

export interface Props {
  className?: string;
  model: Model;
  schema: Schema;
  size?: 'large' | 'small';
}

export default function InstancePreviewImage(props: Props) {
  const references = useSelector((state: RootState) => state.config.references);
  const preview = createPreview(props, references);

  return preview ? (
    preview
  ) : (
    <div
      className={cx(
        'tcfInstancePreviewImage empty',
        props.className,
        props.size || 'small'
      )}
    />
  );
}
