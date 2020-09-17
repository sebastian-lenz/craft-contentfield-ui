import { Action } from 'redux';

import createModel from '../utils/createModel';
import findByPath from '../utils/findByPath';
import modifyPath from '../utils/modifyPath';
import { AnyPathSegment } from '../utils/parsePath';
import { ExpandedState } from '../../contexts/ExpandedStateProvider';
import { RootState } from '../models';

export interface ChangeTypeAction extends Action {
  expandedState?: ExpandedState;
  newType: string;
  path: string | Array<AnyPathSegment>;
  type: 'changeType';
}

export function applyChangeType(
  state: RootState,
  { expandedState, newType, path }: ChangeTypeAction
): RootState {
  const schema = state.schemas[newType];
  if (!schema) {
    return state;
  }

  const oldModel = findByPath(state.model, path);
  const newModel = createModel({
    oldModel,
    schema,
    schemas: state.schemas,
  });

  if (oldModel && expandedState && expandedState.isExpanded(oldModel.__uuid)) {
    expandedState.toggleExpanded(oldModel.__uuid, false);
    expandedState.toggleExpanded(newModel.__uuid, true);
  }

  return {
    ...state,
    model: modifyPath(state.model, path, () => newModel),
  };
}

export default function changeType(
  path: string | Array<AnyPathSegment>,
  newType: string,
  expandedState?: ExpandedState
): ChangeTypeAction {
  return {
    expandedState,
    newType,
    path,
    type: 'changeType',
  };
}
