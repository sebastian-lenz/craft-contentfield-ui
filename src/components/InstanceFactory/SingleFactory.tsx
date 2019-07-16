import * as React from 'react';

import ButtonFlat from '../ButtonFlat';
import Icon from '../Icon';
import Text from '../Text';
import { Schema } from '../../store/models';

export interface Props {
  onCreate: (schema: Schema) => void;
  schema: Schema;
}

export default function SingleFactory({ onCreate, schema }: Props) {
  return (
    <div className="tcfFactory">
      <ButtonFlat
        className="tcfFactory--primaryButton"
        onClick={() => onCreate(schema)}
      >
        <Icon name="plus" />
        <Text params={{ schema: schema.label }} value="Create {schema}" />
      </ButtonFlat>
    </div>
  );
}
