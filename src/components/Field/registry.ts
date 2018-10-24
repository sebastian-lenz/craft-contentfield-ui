import ArrayDefinition from './Array';
import InstanceDefinition from './Instance';
import TextDefinition from './Text';
import TextareaDefinition from './Textarea';
import ReferenceDefinition from './Reference';
import RedactorDefinition from './Redactor';

import { Field } from '../../store/models';
import { FieldDefinition, WidgetComponent } from './types';

const definitions = {
  array: ArrayDefinition,
  instance: InstanceDefinition,
  redactor: RedactorDefinition,
  reference: ReferenceDefinition,
  text: TextDefinition,
  textarea: TextareaDefinition,
};

export type FieldMap = typeof definitions;
export type FieldType = keyof FieldMap;
export type AnyField = Exclude<
  FieldMap[keyof FieldMap]['fieldType'],
  undefined
>;

export function getDefinition<T extends Field>(
  field: T
): FieldDefinition<T> | undefined {
  return definitions[field.type] as any;
}

export function getComponent<T extends Field>(
  field: T
): WidgetComponent<T> | undefined {
  const definition = getDefinition(field);
  return definition ? definition.widget : undefined;
}
