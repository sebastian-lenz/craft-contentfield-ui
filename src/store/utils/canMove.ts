import applyMoveShift from './applyMoveShift';
import fields from '../../fields';
import findByPath from './findByPath';
import findSchema from './findSchema';
import isPathEqual from './isPathEqual';
import { IndexPathSegment, Path } from './parsePath';
import { RootState } from '../models';

export interface MoveInfo {
  sourcePath: Path;
  sourceSegment: IndexPathSegment;
  targetPath: Path;
  targetSegment: IndexPathSegment;
}

export default function canMove(state: RootState, move: MoveInfo): boolean {
  const { sourcePath, sourceSegment, targetPath, targetSegment } = move;
  const source = [...sourcePath, sourceSegment];
  const target = [...targetPath, targetSegment];
  const targetModel = findByPath(state.model, targetPath);
  if (!targetModel) {
    return false;
  }

  // Make sure we are operating on an array
  const targetSchema = findSchema(state, targetModel);
  const targetField = targetSchema.fields[targetSegment.name];
  const targetFieldValue = targetModel[targetSegment.name];
  if (
    !Array.isArray(targetFieldValue) ||
    !targetField ||
    targetField.type !== 'array'
  ) {
    return false;
  }

  // Make sure source and target are different
  const shifted = applyMoveShift(move);
  if (
    isPathEqual(source, target) ||
    isPathEqual(source, [...shifted.targetPath, shifted.targetSegment])
  ) {
    return false;
  }

  // Check the target limit, ignore if we are moving within
  // the same field
  const isSameField =
    isPathEqual(sourcePath, targetPath) &&
    targetSegment.name === sourceSegment.name;

  if (
    !isSameField &&
    targetField.limit > 0 &&
    targetFieldValue.length >= targetField.limit
  ) {
    return false;
  }

  // Finally check whether we can place the moved value
  // in the target field
  const { member } = targetField;
  const definition = fields.getDefinition(member.type);
  const sourceValue = findByPath(state.model, source);

  return definition.isValue(member, sourceValue);
}
