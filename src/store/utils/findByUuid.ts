import findSchema from './findSchema';
import isModel from './isModel';
import { Model, RootState } from '../models';
import { AnyPathSegment } from './parsePath';

export interface UuidLocation {
  model: Model;
  path: Array<AnyPathSegment>;
  uuid: string;
}

function findByUuidRecursive(
  state: RootState,
  uuid: string,
  model: any
): UuidLocation | null {
  if (isModel(model) && model.__uuid === uuid) {
    return { model, path: [], uuid };
  }

  const schema = findSchema(state, model);

  for (const name of Object.keys(schema.fields)) {
    const field = schema.fields[name];

    if (field.type === 'array' && field.member.type === 'instance') {
      const children = model[name];
      if (!Array.isArray(children)) {
        continue;
      }

      for (let index = 0; index < children.length; index++) {
        const child = children[index];
        const result = findByUuidRecursive(state, uuid, child);

        if (result !== null) {
          result.path.unshift({ type: 'index', name, index });
          return result;
        }
      }
    } else if (field.type === 'instance') {
      const result = findByUuidRecursive(state, uuid, model[name]);

      if (result !== null) {
        result.path.unshift({ type: 'property', name });
        return result;
      }
    }
  }

  return null;
}

export default function findByUuid(
  state: RootState,
  uuid: string
): UuidLocation | null {
  return findByUuidRecursive(state, uuid, state.model);
}
