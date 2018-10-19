import addReferences, { applyAddReferences } from './addReferences';
import changeType, { applyChangeType, ChangeTypeAction } from './changeType';
import moveModel, { applyMoveModel } from './moveModel';
import toggleExpanded, { applyToggleExpanded } from './toggleExpanded';
import updateValue, { applyUpdateValue } from './updateValue';

export type AnyAction = ChangeTypeAction;

export const handlers = {
  addReferences: applyAddReferences,
  changeType: applyChangeType,
  moveModel: applyMoveModel,
  toggleExpanded: applyToggleExpanded,
  updateValue: applyUpdateValue,
};

export { addReferences, changeType, moveModel, toggleExpanded, updateValue };
