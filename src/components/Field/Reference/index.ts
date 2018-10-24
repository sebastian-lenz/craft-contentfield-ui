import createFactory from '../../Factory/createFactory';
import preview from './preview';
import widget from './Widget';
import { Field } from '../../../store/models';
import { FieldDefinition } from '../types';

export interface ReferenceField extends Field {
  elementType: string;
  limit: number | null;
  sources: string[] | null;
  type: 'reference';
  viewMode: 'large' | 'small';
}

const definition: FieldDefinition<ReferenceField> = {
  factory: createFactory(() => []),
  preview,
  type: 'reference',
  widget,
};

export default definition;
