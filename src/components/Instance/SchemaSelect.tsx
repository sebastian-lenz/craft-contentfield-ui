import * as React from 'react';
import { Dispatch } from 'redux';

import FieldPanel from '../FieldPanel';
import Select, { sortOptions } from '../Select';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { Context } from '../../contexts/ExpandedStateProvider';
import { changeType } from '../../store/actions';
import { Model, Schema } from '../../store/models';

export interface Props {
  disabled?: boolean;
  dispatch: Dispatch;
  model: Model | null;
  path: Array<AnyPathSegment>;
  schemas: Array<Schema>;
}

export default function SchemaSelect({
  disabled,
  dispatch,
  model,
  path,
  schemas,
}: Props) {
  const expandedState = React.useContext(Context);
  const options = schemas.map(({ qualifier, label }) => ({
    key: qualifier,
    label,
  }));

  options.sort(sortOptions);

  return (
    <FieldPanel className="tcfInstance--controlsSchema" label="Type">
      <Select
        disabled={disabled}
        onChange={(type: string) =>
          dispatch(changeType(path, type, expandedState))
        }
        options={options}
        value={model ? model.__type : null}
      />
    </FieldPanel>
  );
}
