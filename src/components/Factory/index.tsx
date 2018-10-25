import * as React from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import fields, { AnyField } from '../../fields';
import Icon from '../Icon';
import Text from '../Text';
import { FactoryProps } from '../../fields/FieldDefinition';
import { Field, RootState, Schemas } from '../../store/models';

import './index.styl';

export type Props = FactoryProps<AnyField> & {
  schemas: Schemas;
};

export function Factory({ field, label, onCreate, schemas }: Props) {
  return (
    <div className="tcfFactory">
      <Button
        onClick={() => {
          const value = fields.createValue({ field, schemas });
          onCreate(value);
        }}
        secondary
      >
        <Text value={label || 'Create'} />
        <Icon name="plus" />
      </Button>
    </div>
  );
}

export default connect((state: RootState, props: FactoryProps<AnyField>) => ({
  schemas: state.schemas,
}))(Factory);
