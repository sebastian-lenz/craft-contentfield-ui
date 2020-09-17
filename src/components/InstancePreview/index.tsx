import * as React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';

import Renderer from './Renderer';
import { InstanceField } from '../../fields/Instance';
import { Model, RootState } from '../../store/models';
import { PreviewMode } from '../../fields/FieldDefinition';

import './index.styl';

export interface Props {
  className?: string;
  field: InstanceField;
  model: Model;
  mode?: PreviewMode;
  onClick?: () => void;
}

export default function InstancePreview({
  className,
  field,
  model,
  mode,
  onClick,
}: Props) {
  const { references, schemas } = useSelector((state: RootState) => ({
    references: state.config.references,
    schemas: state.schemas,
  }));

  return (
    <div
      className={cx('tcfInstancePreview', className, {
        isClickable: !!onClick,
      })}
      onClick={onClick}
    >
      <Renderer
        field={field}
        model={model}
        mode={mode}
        references={references}
        schemas={schemas}
      />
    </div>
  );
}
