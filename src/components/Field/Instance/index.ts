import InstanceFactory from '../../InstanceFactory';
import preview from './preview';
import widget from './Widget';
import { Field } from '../../../store/models';
import { FieldDefinition } from '../types';

export interface InstanceField extends Field {
  schemas: Array<string>;
  type: 'instance';
}

const definition: FieldDefinition<InstanceField> = {
  factory: InstanceFactory,
  preview,
  type: 'instance',
  widget,
};

export default definition;
