import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FieldPanel from '../FieldPanel';
import InstanceDepthProvider from '../../contexts/InstanceDepthProvider';
import InstanceForm from '../InstanceForm';
import isModel from '../../store/utils/isModel';
import ResponsiveStateProvider from '../../contexts/ResponsiveStateProvider';
import Select, { sortOptions } from '../Select';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { changeType } from '../../store/actions';
import { Model, RootState } from '../../store/models';

import './index.styl';

export interface Props {
  canChangeType?: boolean;
  disabled?: boolean;
  isBorderless?: boolean;
  model: Model;
  path: Array<AnyPathSegment>;
  schemaNames: Array<string>;
}

export default React.memo(function Instance({
  canChangeType = true,
  disabled = false,
  isBorderless,
  model,
  path,
  schemaNames,
}: Props) {
  const dispatch = useDispatch();
  const schemas = useSelector((state: RootState) =>
    schemaNames.map(name => state.schemas[name])
  );

  let schemaSelect: React.ReactNode;
  let isValidModel = false;
  if (isModel(model)) {
    isValidModel = schemas.some(schema => schema.qualifier === model.__type);
  }

  if (canChangeType && schemas.length > 1) {
    const handleChange = (type: string) => dispatch(changeType(path, type));
    const options = schemas.map(({ qualifier, label }) => ({
      key: qualifier,
      label,
    }));

    options.sort(sortOptions);

    schemaSelect = (
      <FieldPanel className="tcfInstance--typeSelect" label="Type">
        <Select
          disabled={disabled}
          onChange={handleChange}
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
});
