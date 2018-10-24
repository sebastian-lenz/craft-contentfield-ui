import createFactory from '../../Factory/createFactory';
import widget from './Widget';
import { Field } from '../../../store/models';
import { FieldDefinition } from '../types';

export interface TextareaField extends Field {
  type: 'textarea';
}

const definition: FieldDefinition<TextareaField> = {
  factory: createFactory(() => ''),
  preview: (data: any) => {
    return typeof data === 'string' ? data : null;
  },
  type: 'textarea',
  widget,
};

export default definition;
