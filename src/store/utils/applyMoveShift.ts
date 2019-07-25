import isSegmentEqual from './isSegmentEqual';
import { MoveInfo } from './canMove';

// If the target path is within the source path, we must adjust
// its index
export default function applyMoveShift(move: MoveInfo): MoveInfo {
  const { sourcePath, sourceSegment, targetPath, targetSegment } = move;
  const target = [...targetPath, targetSegment];

  if (
    target.length > sourcePath.length &&
    sourcePath.every((segment, index) => isSegmentEqual(segment, target[index]))
  ) {
    const segment = target[sourcePath.length];
    if (segment.type != 'index') {
      throw new Error('Path segment type mismatch');
    }

    if (
      segment.name == sourceSegment.name &&
      segment.index > sourceSegment.index
    ) {
      target[sourcePath.length] = {
        ...segment,
        index: segment.index - 1,
      };

      const targetSegment = target.pop();
      if (!targetSegment || targetSegment.type !== 'index') {
        throw new Error('Unsupported operation');
      }

      return {
        ...move,
        targetPath: target,
        targetSegment,
      };
    }
  }

  return move;
}
