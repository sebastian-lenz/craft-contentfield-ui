import createFactory from '../../Factory/createFactory';
import widget from './Widget';
import { Field } from '../../../store/models';
import { FieldDefinition } from '../types';
import { getDefinition, AnyField } from '../registry';
import { PreviewContext } from '../../InstancePreview';

export interface ArrayField extends Field {
  member: AnyField;
  type: 'array';
}

function preview(value: any, field: ArrayField, context: PreviewContext) {
  if (!Array.isArray(value)) {
    return null;
  }

  const definition = getDefinition(field.member);
  if (!definition) {
    return null;
  }

  return value.map(value => definition.preview(value, field.member, context));
}

const definition: FieldDefinition<ArrayField> = {
  factory: createFactory(() => []),
  preview,
  type: 'array',
  widget,
};

export default definition;
