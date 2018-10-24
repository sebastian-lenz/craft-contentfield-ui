import uuid from './uuid';
import { getDefinition } from '../../components/Field/registry';
import { Model, Schema } from '../models';

export default function createModel(schema: Schema, previous?: Model): Model {
  const result: Model = {
    ...(previous || {}),
    __type: schema.qualifier,
    __uuid: uuid(),
  };

  /*
  for (const name in schema.fields) {
    const field = schema.fields[name];
    const definition = getDefinition(field);
    if (definition) {
      result[name] = null;
    }
  }
  */

  return result;
}
