import addReferences, { applyAddReferences, AddReferencesAction } from './addReferences';
import changeType, { applyChangeType, ChangeTypeAction } from './changeType';
import moveModel, { applyMoveModel, MoveModelAction } from './moveModel';
import setOverlay, { applySetOverlay, SetOverlayAction } from './setOverlay';
import setUser, { applySetUser, SetUserAction } from './setUser';
import uuidOrder, {applyUuidOrder, UuidOrderAction} from './uuidOrder';
import uuidRemove, {applyUuidRemove, UuidRemoveAction} from './uuidRemove';
import updateValue, { applyUpdateValue, UpdateValueAction } from './updateValue';
import updateSync, { applyUpdateSync, UpdateSyncAction } from './updateSync';

import synchronize from './synchronize';
import toggleUserFavorite from './toggleUserFavorite'

export type AnyAction =
  | AddReferencesAction
  | ChangeTypeAction
  | MoveModelAction
  | SetOverlayAction
  | SetUserAction
  | UuidOrderAction
  | UuidRemoveAction
  | UpdateSyncAction
  | UpdateValueAction;

export const handlers = {
  addReferences: applyAddReferences,
  changeType: applyChangeType,
  moveModel: applyMoveModel,
  setOverlay: applySetOverlay,
  setUser: applySetUser,
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
  setUser,
  uuidOrder,
  uuidRemove,
  updateSync,
  updateValue,

  synchronize,
  toggleUserFavorite,
};
