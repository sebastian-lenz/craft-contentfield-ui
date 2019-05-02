import * as React from 'react';

import ElementSelect from '../../components/ElementSelect';
import { ReferenceField } from './index';
import { WidgetProps } from '../FieldDefinition';

export type Props = WidgetProps<ReferenceField>;

export default function ReferenceWidget({
  data,
  field,
  model,
  onUpdate,
}: Props) {
  return (
    <ElementSelect
      criteria={field.criteria}
      data={data}
      elementType={field.elementType}
      limit={field.limit}
      modalStorageKey={`tcf_${model.__type}_${field.name}`}
      onUpdate={onUpdate}
      sources={field.sources}
      viewMode={field.viewMode}
    />
  );
}
