import * as React from 'react';
import { useSelector } from 'react-redux';

import ButtonFlat from '../ButtonFlat';
import fields, { AnyField } from '../../fields';
import Icon from '../Icon';
import Text from '../Text';
import { FactoryProps } from '../../fields/FieldDefinition';
import { RootState, Schemas } from '../../store/models';

import './index.styl';

export type Props = FactoryProps<AnyField>;

export default function Factory({ field, onCreate }: Props) {
  const schemas = useSelector((state: RootState) => state.schemas);

  return (
    <div className="tcfFactory">
      <ButtonFlat
        className="tcfFactory--primaryButton"
        onClick={() => {
          const value = fields.createValue({ field, schemas });
          onCreate(value);
        }}
        secondary
      >
        <Icon name="plus" />
        <Text value="Create" />
      </ButtonFlat>
    </div>
  );
}
