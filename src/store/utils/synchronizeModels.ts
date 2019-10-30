import cloneModel from './cloneModel';
import createLogger from './createLogger';
import isModel from './isModel';
import synchronizeArrays from './synchronizeArrays';
import { Model, Schemas } from '../models';
import { TranslateOptions } from './fetchTranslation';

export type ArrayOrphanMode = 'none' | 'hide' | 'remove';

export interface SynchronizeOptions {
  arrayOrphanMode?: ArrayOrphanMode;
  schemas: Schemas;
  translate?: TranslateOptions;
  verbose?: boolean;
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
  const l = createLogger(options);
  if (!isModel(source)) {
    l.info(`No source, skipping ${l.model(target)}`);
    return target;
  }

  if (!isModel(target) || target.__type !== source.__type) {
    if (target) {
      l.info(`Type missmatch, cloning ${l.model(source)}`);
    } else {
      l.info(`No target, cloning ${l.model(source)}`);
    }

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
  l.group(`Syncing model ${l.model(source)} > ${l.model(target)}`);

  for (const name of Object.keys(schema.fields)) {
    const field = schema.fields[name];

    if (field.type === 'array') {
      l.group(`Array ${name}`);
      result[name] = await synchronizeArrays({
        ...options,
        field,
        source: source[name],
        target: target[name],
      });
      l.groupEnd();
    } else if (field.type === 'instance') {
      l.group(`Instance ${name}`);
      result[name] = await synchronizeModels({
        ...options,
        source: source[name],
        target: target[name],
      });
      l.groupEnd();
    }
  }

  l.groupEnd();
  return result;
}
