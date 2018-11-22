import cloneModel from './cloneModel';
import isModel from './isModel';
import synchronizeArrays from './synchronizeArrays';
import { Model, Schemas } from '../models';
import { TranslateOptions } from './fetchTranslation';

export interface SynchronizeOptions {
  schemas: Schemas;
  translate?: TranslateOptions;
}

export interface SynchronizeModelsOptions extends SynchronizeOptions {
  source: Model | undefined;
  target: Model | undefined;
}

export default async function synchronizeModels({
  source,
  target,
  ...options
}: SynchronizeModelsOptions): Promise<Model | undefined> {
  if (!isModel(source)) {
    return target;
  }

  if (!isModel(target) || target.__type !== source.__type) {
    return cloneModel({
      ...options,
      source,
    });
  }

  const schema = options.schemas[source.__type];
  if (!schema) {
    throw new Error('Invalid schema');
  }

  const result = { ...target };
  for (const name of Object.keys(schema.fields)) {
    const field = schema.fields[name];

    if (field.type === 'array') {
      result[name] = await synchronizeArrays({
        ...options,
        field,
        source: source[name],
        target: target[name],
      });
    } else if (field.type === 'instance') {
      result[name] = await synchronizeModels({
        ...options,
        source: source[name],
        target: target[name],
      });
    }
  }

  return result;
}
