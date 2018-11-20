import addReferences, { applyAddReferences, AddReferencesAction } from './addReferences';
import changeType, { applyChangeType, ChangeTypeAction } from './changeType';
import moveModel, { applyMoveModel, MoveModelAction } from './moveModel';
import synchronize, { applySynchronize, SynchronizeAction } from './synchronize';
import toggleExpanded, { applyToggleExpanded, ToggleExpandedAction } from './toggleExpanded';
import updateValue, { applyUpdateValue, UpdateValueAction } from './updateValue';

export type AnyAction =
  | AddReferencesAction
  | ChangeTypeAction
  | MoveModelAction
  | SynchronizeAction
  | ToggleExpandedAction
  | UpdateValueAction;

export const handlers = {
  addReferences: applyAddReferences,
  changeType: applyChangeType,
  moveModel: applyMoveModel,
  synchronize: applySynchronize,
  toggleExpanded: applyToggleExpanded,
  updateValue: applyUpdateValue,
};

export {
  addReferences,
  changeType,
  moveModel,
  synchronize,
  toggleExpanded,
  updateValue,
};
