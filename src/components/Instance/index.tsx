import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import InstanceDepthProvider from '../../contexts/InstanceDepthProvider';
import InstanceForm from '../InstanceForm';
import isModel from '../../store/utils/isModel';
import ResponsiveStateProvider from '../../contexts/ResponsiveStateProvider';
import SchemaSelect from './SchemaSelect';
import VisibilityToggle from './VisibilityToggle';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { Model, RootState } from '../../store/models';

import './index.styl';

export interface Props {
  canChangeType?: boolean;
  canChangeVisibility?: boolean;
  disabled?: boolean;
  isBorderless?: boolean;
  model: Model;
  path: Array<AnyPathSegment>;
  schemaNames: Array<string>;
}

export default React.memo(function Instance({
  canChangeVisibility = false,
  canChangeType = true,
  disabled = false,
  isBorderless,
  model,
  path,
  schemaNames,
}: Props) {
  const dispatch = useDispatch();
  const schemas = useSelector((state: RootState) =>
    schemaNames.map((name) => state.schemas[name])
  );

  let isValidModel = false;
  if (isModel(model)) {
    isValidModel = schemas.some((schema) => schema.qualifier === model.__type);
  }

  const showTypes = canChangeType && schemas.length > 1;
  const showVisibility =
    canChangeVisibility && isValidModel && !model.__visible;

  return (
    <InstanceDepthProvider>
      <ResponsiveStateProvider>
        {showTypes || showVisibility ? (
          <div className="tcfInstance--controls">
            {showTypes ? (
              <SchemaSelect
                disabled={disabled}
                dispatch={dispatch}
                model={isValidModel ? model : null}
                path={path}
                schemas={schemas}
              />
            ) : null}

            {/*
             * This is a temporal solution, somehow we end up with hidden instances in some
             * edge cases, this allows editors to reenable those
             */}
            {showVisibility ? (
              <VisibilityToggle
                disabled={disabled}
                dispatch={dispatch}
                model={model}
              />
            ) : null}
          </div>
        ) : null}

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
