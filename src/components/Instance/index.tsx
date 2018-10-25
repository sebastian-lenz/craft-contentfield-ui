import * as React from 'react';
import { connect } from 'react-redux';

import FieldPanel from '../FieldPanel';
import InstanceForm from '../InstanceForm';
import isModel from '../../store/utils/isModel';
import Select from '../Select';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { changeType } from '../../store/actions';
import { Model, RootState, Schema } from '../../store/models';

import './index.styl';

export type ExternalProps = {
  canChangeType?: boolean;
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
  canChangeType = true,
  className = 'tcfInstance',
  model,
  onChangeType,
  path,
  schemas,
}: Props) {
  let schemaSelect: React.ReactNode;

  if (canChangeType && schemas.length > 1) {
    schemaSelect = (
      <FieldPanel label="Type">
        <Select
          onChange={onChangeType}
          options={schemas.map(({ qualifier, label }) => ({
            key: qualifier,
            label,
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
