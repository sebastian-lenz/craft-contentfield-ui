import addReferences, { applyAddReferences, AddReferencesAction } from './addReferences';
import changeType, { applyChangeType, ChangeTypeAction } from './changeType';
import moveModel, { applyMoveModel, MoveModelAction } from './moveModel';
import synchronize from './synchronize';
import toggleExpanded, { applyToggleExpanded, ToggleExpandedAction } from './toggleExpanded';
import updateValue, { applyUpdateValue, UpdateValueAction } from './updateValue';
import updateSync, { applyUpdateSync, UpdateSyncAction } from './updateSync';

export type AnyAction =
  | AddReferencesAction
  | ChangeTypeAction
  | MoveModelAction
  | ToggleExpandedAction
  | UpdateSyncAction
  | UpdateValueAction;

export const handlers = {
  addReferences: applyAddReferences,
  changeType: applyChangeType,
  moveModel: applyMoveModel,
  toggleExpanded: applyToggleExpanded,
  updateSync: applyUpdateSync,
  updateValue: applyUpdateValue,
};

export {
  addReferences,
  changeType,
  moveModel,
  synchronize,
  toggleExpanded,
  updateSync,
  updateValue,
};
