import * as React from 'react';
import { connect } from 'react-redux';

import createModel from '../../store/utils/createModel';
import FieldPanel from '../FieldPanel';
import InstanceForm from '../InstanceForm';
import Select from '../Select';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { changeType, updateValue } from '../../store/actions';
import { Model, RootState, Schema } from '../../store/models';
import isModel from '../../store/utils/isModel';

export type ExternalProps = {
  className?: string;
  model: Model;
  path: Array<AnyPathSegment>;
  schemaNames: Array<string>;
};

export type Props = ExternalProps & {
  onChangeType: (type: string) => void;
  schemas: Array<Schema>;
};

export function Instance({
  className,
  model,
  onChangeType,
  path,
  schemas,
}: Props) {
  let schemaSelect: React.ReactNode;

  if (schemas.length > 1) {
    schemaSelect = (
      <FieldPanel label="Schema">
        <Select
          onChange={onChangeType}
          options={schemas.map(({ qualifier, label }) => ({
            key: qualifier,
            label,
            value: qualifier,
          }))}
          value={model.__type}
        />
      </FieldPanel>
    );
  }

  let isValidModel = false;
  if (isModel(model)) {
    isValidModel = schemas.some(schema => schema.qualifier === model.__type);
  }

  return (
    <div className={className}>
      {schemaSelect}
      {isValidModel ? <InstanceForm model={model} path={path} /> : null}
    </div>
  );
}

export default connect(
  (state: RootState, props: ExternalProps) => ({
    schemas: props.schemaNames.map(name => state.schemas[name]),
  }),
  (dispatch, props: ExternalProps) => ({
    onChangeType: (type: string) => dispatch(changeType(props.path, type)),
  })
)(Instance);
