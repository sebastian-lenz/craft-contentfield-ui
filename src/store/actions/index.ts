import addReferences, { applyAddReferences, AddReferencesAction } from './addReferences';
import changeType, { applyChangeType, ChangeTypeAction } from './changeType';
import moveModel, { applyMoveModel, MoveModelAction } from './moveModel';
import setOverlay, { applySetOverlay, SetOverlayAction } from './setOverlay';
import setUser, { applySetUser, SetUserAction } from './setUser';
import uuidInsert, {applyUuidInsert, UuidInsertAction} from './uuidInsert';
import uuidOrder, {applyUuidOrder, UuidOrderAction} from './uuidOrder';
import uuidRemove, {applyUuidRemove, UuidRemoveAction} from './uuidRemove';
import uuidVisibility, {applyUuidVisibility, UuidVisibilityAction} from './uuidVisibility';
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
  | UuidInsertAction
  | UuidOrderAction
  | UuidRemoveAction
  | UuidVisibilityAction
  | UpdateSyncAction
  | UpdateValueAction;

export const handlers = {
  addReferences: applyAddReferences,
  changeType: applyChangeType,
  moveModel: applyMoveModel,
  setOverlay: applySetOverlay,
  setUser: applySetUser,
  uuidInsert: applyUuidInsert,
  uuidOrder: applyUuidOrder,
  uuidRemove: applyUuidRemove,
  uuidVisibility: applyUuidVisibility,
  updateSync: applyUpdateSync,
  updateValue: applyUpdateValue,
};

export {
  addReferences,
  changeType,
  moveModel,
  setOverlay,
  setUser,
  uuidInsert,
  uuidOrder,
  uuidRemove,
  uuidVisibility,
  updateSync,
  updateValue,

  synchronize,
  toggleUserFavorite,
};
