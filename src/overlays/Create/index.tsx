import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fields from '../../fields';
import findByUuid from '../../store/utils/findByUuid';
import findOwner from '../../store/utils/findOwner';
import isModel from '../../store/utils/isModel';
import { ArrayField } from '../../fields/Array';
import { Context } from '../../contexts/ExpandedStateProvider';
import { RootState } from '../../store/models';
import { setOverlay, uuidInsert } from '../../store/actions';
import { UuidInsertPosition } from '../../store/actions/uuidInsert';

import Error from './Error';
import Form from './Form';
import { OverlayState } from '../../store/models/overlay';

export interface Props {
  afterCreate?: 'expand' | 'layer';
  uuid: string;
}

export default function Create({ afterCreate = 'expand', uuid }: Props) {
  const dispatch = useDispatch();
  const context = React.useContext(Context);

  const data = useSelector((state: RootState) => {
    const location = findByUuid(state, uuid);
    if (!location || !location.path.length) {
      return null;
    }

    const owner = findOwner(state, location.path);
    if (!owner || owner.field.type !== 'array' || owner.index === undefined) {
      return null;
    }

    return { field: owner.field as ArrayField, model: owner.owner };
  });

  function onClose() {
    dispatch(setOverlay(null));
  }

  function onCreate(value: any, position: UuidInsertPosition) {
    let overlay: OverlayState = null;
    if (isModel(value)) {
      if (afterCreate === 'expand') {
        context.toggleExpanded(value.__uuid, true);
      } else {
        overlay = { type: 'edit', uuid: value.__uuid };
      }
    }

    dispatch(uuidInsert(uuid, value, position));
    dispatch(setOverlay(overlay));
  }

  if (data === null) {
    return <Error onClose={onClose} />;
  }

  const { field, model } = data;
  const { factory } = fields.getDefinition(field.member.type);

  return (
    <Form
      Factory={factory}
      field={field.member}
      onCreate={onCreate}
      scope={model.__type}
    ></Form>
  );
}
