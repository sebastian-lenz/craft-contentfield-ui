import { RootState, Model, Schema } from '../models';

export default function findSchema(state: RootState, model: Model): Schema {
  const schema = state.schemas[model.__type];
  if (!schema) {
    throw new Error(`Could not resolve schema "${model.__type}".`);
  }

  return schema;
}
