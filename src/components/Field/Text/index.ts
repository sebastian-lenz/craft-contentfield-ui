import createFactory from '../../Factory/createFactory';
import widget from './Widget';
import { Field } from '../../../store/models';
import { FieldDefinition } from '../types';

export interface TextField extends Field {
  type: 'text';
}

const definition: FieldDefinition<TextField> = {
  factory: createFactory(() => ''),
  preview: (data: any) => {
    return typeof data === 'string' ? data : null;
  },
  type: 'text',
  widget,
};

export default definition;
