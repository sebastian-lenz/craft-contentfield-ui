import * as React from 'react';

import ElementSelect from '../../components/ElementSelect';
import { ReferenceField } from './index';
import { WidgetProps } from '../FieldDefinition';

export type Props = WidgetProps<ReferenceField>;

export default function ReferenceWidget({ data, field, onUpdate }: Props) {
  return (
    <ElementSelect
      data={data}
      elementType={field.elementType}
      limit={field.limit}
      onUpdate={onUpdate}
      sources={field.sources}
      viewMode={field.viewMode}
    />
  );
}
