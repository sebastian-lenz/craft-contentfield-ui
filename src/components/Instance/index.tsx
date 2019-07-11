import * as React from 'react';
import { connect } from 'react-redux';

import FieldPanel from '../FieldPanel';
import InstanceDepthProvider from '../../contexts/InstanceDepthProvider';
import InstanceForm from '../InstanceForm';
import isModel from '../../store/utils/isModel';
import Select, { sortOptions } from '../Select';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { changeType } from '../../store/actions';
import { Model, RootState, Schema } from '../../store/models';

import './index.styl';
import ResponsiveStateProvider from '../../contexts/ResponsiveStateProvider';

export type ExternalProps = {
  canChangeType?: boolean;
  disabled?: boolean;
  isBorderless?: boolean;
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
  disabled = false,
  isBorderless,
  model,
  onChangeType,
  path,
  schemas,
}: Props) {
  let schemaSelect: React.ReactNode;

  let isValidModel = false;
  if (isModel(model)) {
    isValidModel = schemas.some(schema => schema.qualifier === model.__type);
  }

  if (canChangeType && schemas.length > 1) {
    const options = schemas.map(({ qualifier, label }) => ({
      key: qualifier,
      label,
    }));

    options.sort(sortOptions);

    schemaSelect = (
      <FieldPanel className="tcfInstance--typeSelect" label="Type">
        <Select
          disabled={disabled}
          onChange={onChangeType}
          options={options}
          value={isValidModel ? model.__type : null}
        />
      </FieldPanel>
    );
  }

  return (
    <InstanceDepthProvider>
      <ResponsiveStateProvider>
        {schemaSelect}
        {isValidModel ? (
          <InstanceForm
            disabled={disabled}
            model={model}
            isBorderless={isBorderless}
            path={path}
          />
        ) : null}
      </ResponsiveStateProvider>
    </InstanceDepthProvider>
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
