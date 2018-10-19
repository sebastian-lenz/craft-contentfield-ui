import { RootState, Model, Field, Schema } from '../models';
import parsePath, { AnyPathSegment } from './parsePath';
import findByPath from './findByPath';
import findSchema from './findSchema';

export interface OwnerInfo {
  field: Field;
  index?: number;
  owner: Model;
  schema: Schema;
}

export default function findOwner(
  state: RootState,
  path: string | Array<AnyPathSegment>
): OwnerInfo | null {
  path = typeof path === 'string' ? parsePath(path) : path.slice();

  // If there is no segment before, path points to root
  const lastSegment = path.pop();
  if (!lastSegment) {
    return null;
  }

  const owner = findByPath(state.model, path);
  if (!owner) {
    throw new Error('Could not resolve owner');
  }

  const schema = findSchema(state, owner);
  const index = lastSegment.type === 'index' ? lastSegment.index : undefined;
  const field = schema.fields[lastSegment.name];
  if (!field) {
    throw new Error(
      `Could not resolve field "${lastSegment.name}" on schema "${
        schema.qualifier
      }".`
    );
  }

  return {
    field,
    index,
    owner,
    schema,
  };
}
