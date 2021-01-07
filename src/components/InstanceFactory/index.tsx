import * as React from 'react';
import { useSelector } from 'react-redux';

import createModel from '../../store/utils/createModel';
import MultipleFactory from './MultipleFactory';
import SingleFactory from './SingleFactory';
import { FactoryProps } from '../../fields/FieldDefinition';
import { InstanceField } from '../../fields/Instance';
import { RootState, Schema, Schemas } from '../../store/models';

export type ExternalProps = FactoryProps<InstanceField>;

export type Props = ExternalProps & {
  available: Array<Schema>;
  schemas: Schemas;
};

export default function InstanceFactory({ field, onCreate, scope }: Props) {
  const schemas = useSelector((state: RootState) => state.schemas);
  const availableSchemas = field.schemas
    .map((name) => schemas[name])
    .sort((a, b) => a.label.localeCompare(b.label));

  if (!availableSchemas.length) {
    return null;
  }

  const handleCreate = (schema: Schema) => {
    if (availableSchemas.indexOf(schema) === -1) {
      return;
    }

    return onCreate(createModel({ schemas, schema }));
  };

  if (availableSchemas.length > 1) {
    return (
      <MultipleFactory
        onCreate={handleCreate}
        schemas={availableSchemas}
        scope={scope}
      />
    );
  } else {
    return (
      <SingleFactory onCreate={handleCreate} schema={availableSchemas[0]} />
    );
  }
}
