import * as React from 'react';

import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';
import { FactoryProps } from '../Field/types';
import { Field } from '../../store/models';

import './index.styl';

export type FactoryCallback<T extends Field> = (field: T) => any;

export interface Props<T extends Field> extends FactoryProps<T> {
  callback: FactoryCallback<T>;
}

export default function Factory<T extends Field>({
  callback,
  field,
  label,
  onCreate,
}: Props<T>) {
  return (
    <div className="tcfFactory">
      <Button onClick={() => onCreate(callback(field))} secondary>
        <Text value={label || 'Create'} />
        <Icon name="plus" />
      </Button>
    </div>
  );
}
