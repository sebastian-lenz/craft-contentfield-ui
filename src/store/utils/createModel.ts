import fields from '../../fields';
import uuid from './uuid';
import { Model, Schema, Schemas } from '../models';

export interface CreateModelOptions {
  oldModel?: Model;
  schemas: Schemas;
  schema: Schema;
}

export default function createModel({
  schemas,
  schema,
  oldModel,
}: CreateModelOptions): Model {
  const result: Model = {
    __errors: {},
    __type: schema.qualifier,
    __uuid: uuid(),
    __visible: true,
  };

  for (const name of Object.keys(schema.fields)) {
    const field = schema.fields[name];
    const definition = fields.getDefinition(field);
    let value = oldModel && name in oldModel ? oldModel[name] : undefined;

    if (value === void 0 || !definition.isValue(field, value)) {
      value = definition.createValue({
        field,
        schemas,
      });
    }

    result[name] = value;
  }

  return result;
}
