import * as React from 'react';

import Renderer from './Renderer';
import { InstanceField } from '../../fields/Instance';
import { Model, RootState } from '../../store/models';
import { useSelector } from 'react-redux';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  field: InstanceField;
  model: Model;
}

export default function InstancePreviewLabel(props: Props) {
  const [references, schemas] = useSelector((state: RootState) => [
    state.config.references,
    state.schemas,
  ]);

  return <Renderer {...props} references={references} schemas={schemas} />;
}
