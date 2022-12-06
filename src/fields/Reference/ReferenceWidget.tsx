import * as React from 'react';

import ElementSelect from '../../components/ElementSelect';
import { ReferenceField } from './index';
import { WidgetProps } from '../FieldDefinition';

export type Props = WidgetProps<ReferenceField>;

export default function ReferenceWidget({
  data,
  disabled,
  field,
  model,
  onUpdate,
}: Props) {
  console.log(field);
  return (
    <ElementSelect
      allowSelfReference={field.allowSelfReference}
      criteria={field.criteria}
      disabled={disabled}
      data={data}
      elementType={field.elementType}
      limit={field.limit || null}
      modalStorageKey={
        field.modalStorageKey || `tcf_${model.__type}_${field.name}`
      }
      onUpdate={onUpdate}
      showSiteMenu={field.showSiteMenu}
      sources={field.sources || null}
      viewMode={field.viewMode}
    />
  );
}
