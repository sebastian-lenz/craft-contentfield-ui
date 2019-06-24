import addReferences, { applyAddReferences, AddReferencesAction } from './addReferences';
import changeType, { applyChangeType, ChangeTypeAction } from './changeType';
import moveModel, { applyMoveModel, MoveModelAction } from './moveModel';
import setOverlay, { applySetOverlay, SetOverlayAction } from './setOverlay';
import synchronize from './synchronize';
import toggleExpanded, { applyToggleExpanded, ToggleExpandedAction } from './toggleExpanded';
import uuidOrder, {applyUuidOrder, UuidOrderAction} from './uuidOrder';
import uuidRemove, {applyUuidRemove, UuidRemoveAction} from './uuidRemove';
import updateValue, { applyUpdateValue, UpdateValueAction } from './updateValue';
import updateSync, { applyUpdateSync, UpdateSyncAction } from './updateSync';

export type AnyAction =
  | AddReferencesAction
  | ChangeTypeAction
  | MoveModelAction
  | SetOverlayAction
  | ToggleExpandedAction
  | UuidOrderAction
  | UuidRemoveAction
  | UpdateSyncAction
  | UpdateValueAction;

export const handlers = {
  addReferences: applyAddReferences,
  changeType: applyChangeType,
  moveModel: applyMoveModel,
  setOverlay: applySetOverlay,
  toggleExpanded: applyToggleExpanded,
  uuidOrder: applyUuidOrder,
  uuidRemove: applyUuidRemove,
  updateSync: applyUpdateSync,
  updateValue: applyUpdateValue,
};

export {
  addReferences,
  changeType,
  moveModel,
  setOverlay,
  synchronize,
  toggleExpanded,
  uuidOrder,
  uuidRemove,
  updateSync,
  updateValue,
};
