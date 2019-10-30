import fields from '../../fields';
import uuid from './uuid';
import { Model } from '../models';
import { SynchronizeOptions } from './synchronizeModels';

export interface CloneModelOptions extends SynchronizeOptions {
  source: Model;
}

export default async function cloneModel({
  source,
  ...options
}: CloneModelOptions): Promise<Model> {
  const schema = options.schemas[source.__type];
  if (!schema) {
    throw new Error('Invalid source schema.');
  }

  const result: Model = {
    __errors: {},
    __originalUuid: source.__uuid,
    __type: schema.qualifier,
    __uuid: uuid(),
    __visible: source.__visible,
  };

  for (const name of Object.keys(schema.fields)) {
    const field = schema.fields[name];
    const definition = fields.getDefinition(field);
    result[name] = await definition.cloneValue({
      ...options,
      field,
      value: source[name],
    });
  }

  return result;
}
