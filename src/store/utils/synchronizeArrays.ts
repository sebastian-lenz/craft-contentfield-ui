import isModel from './isModel';
import cloneModel from './cloneModel';
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
  return (
    left.__uuid === right.__uuid ||
    left.__uuid === right.__originalUuid ||
    left.__originalUuid === right.__uuid ||
    left.__originalUuid === right.__originalUuid
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
  const result: Array<Model> = [];

  for (const sourceModel of sourceModels) {
    const existingIndex = existingModels.findIndex(model =>
      isUuidMatch(model, sourceModel)
    );

    let model: Model | undefined;
    if (existingIndex === -1) {
      model = await cloneModel({
        ...options,
        source: sourceModel,
      });
    } else {
      model = await synchronizeModels({
        ...options,
        source: sourceModel,
        target: existingModels[existingIndex],
      });
    }

    if (model) {
      result.push(model);
    }
  }

  return result;
}
