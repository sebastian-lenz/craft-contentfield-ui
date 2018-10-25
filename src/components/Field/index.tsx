import * as React from 'react';

import { Model } from '../../store/models';
import { AnyPathSegment } from '../../store/utils/parsePath';
import fields, { AnyField } from '../../fields';

export interface Props {
  className?: string;
  data: any;
  model: Model;
  onUpdate: (value: any) => void;
  path: Array<AnyPathSegment>;
  field: AnyField;
}

export default function Field(props: Props) {
  const { field } = props;
  const { widget } = fields.getDefinition(field);
  return React.createElement(widget, props);
}
