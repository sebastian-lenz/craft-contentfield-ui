import isModel from './isModel';
import cloneModel from './cloneModel';
import createLogger from './createLogger';
import synchronizeModels, { SynchronizeOptions } from './synchronizeModels';
import { ArrayField } from '../../fields/Array';
import { Model } from '../models';

function toModelList(value: any): Array<Model> {
  if (!Array.isArray(value)) {
    return [];
  }

  const result: Array<Model> = [];
  for (const entry of value) {
    if (isModel(entry)) {
      result.push(entry);
    }
  }

  return result;
}

function isUuidMatch(left: Model, right: Model): boolean {
  const leftOrigin = left.__originalUuid !== null;
  const rightOrigin = right.__originalUuid !== null;

  return (
    left.__uuid === right.__uuid ||
    (rightOrigin && left.__uuid === right.__originalUuid) ||
    (leftOrigin && left.__originalUuid === right.__uuid) ||
    (leftOrigin && rightOrigin && left.__originalUuid === right.__originalUuid)
  );
}

export interface SynchronizeArraysOptions extends SynchronizeOptions {
  field: ArrayField;
  source: Array<any> | undefined;
  target: Array<any> | undefined;
}

export default async function synchronizeArrays({
  field,
  source,
  target,
  ...options
}: SynchronizeArraysOptions): Promise<Array<any>> {
  if (field.member.type !== 'instance') {
    return source || [];
  }

  const sourceModels = toModelList(source);
  const existingModels = toModelList(target);
  const l = createLogger(options);
  const result: Array<Model> = [];

  for (const sourceModel of sourceModels) {
    const existingIndex = existingModels.findIndex(model =>
      isUuidMatch(model, sourceModel)
    );

    let model: Model | undefined;
    if (existingIndex === -1) {
      l.info(`No array match for ${l.model(sourceModel)}`);
      model = await cloneModel({
        ...options,
        source: sourceModel,
      });
    } else {
      const existingModel = existingModels[existingIndex];
      l.info(
        `Array match for ${l.model(sourceModel)} is ${l.model(existingModel)}`
      );

      existingModels.splice(existingIndex, 1);
      model = await synchronizeModels({
        ...options,
        source: sourceModel,
        target: existingModel,
      });
    }

    if (model) {
      result.push(model);
    }
  }

  if (options.arrayOrphanMode !== 'remove') {
    for (const existingModel of existingModels) {
      if (options.arrayOrphanMode === 'hide') {
        result.push({ ...existingModel, __visible: false });
      } else {
        result.push(existingModel);
      }
    }
  }

  return result;
}
