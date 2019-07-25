import uuid from './uuid';
import { Model, Schemas } from '../models';

export interface UuidObject extends Object {
  __uuid: string;
}

export function isUuidObject(data: any): data is UuidObject {
  return data && typeof data === 'object' && '__uuid' in data;
}

export function toObject(value: any): Object {
  switch (typeof value) {
    case 'boolean':
      return new Boolean(value);
    case 'number':
      return new Number(value);
    case 'object':
      return value;
    default:
      return new String(value);
  }
}

export function toUuidObject(value: any, oldValue?: any): UuidObject {
  if (isUuidObject(value)) {
    return value;
  }

  const object = toObject(value);
  Object.defineProperty(object, '__uuid', {
    value: oldValue && isUuidObject(oldValue) ? oldValue.__uuid : uuid(),
  });

  return object as UuidObject;
}

export function toUuidObjects(model: Model, schemas: Schemas): Model {
  const { fields } = schemas[model.__type];

  for (const name of Object.keys(fields)) {
    const field = fields[name];
    if (field.type === 'array') {
      model[name] = model[name].map((value: any) =>
        field.member.type === 'instance'
          ? toUuidObjects(value, schemas)
          : toUuidObject(value)
      );
    } else if (field.type === 'instance') {
      model[name] = toUuidObjects(model[name], schemas);
    }
  }

  return model;
}
