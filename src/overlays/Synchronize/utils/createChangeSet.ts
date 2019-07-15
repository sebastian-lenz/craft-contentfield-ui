import { Model, Schemas } from '../../../store/models';
import { AnyPathSegment } from '../../../store/utils/parsePath';
import isModel from '../../../store/utils/isModel';

export type ChangeSet = ChangeSetError | ChangeSetResult;

export interface ChangeSetError {
  message: string;
  result: false;
  siteId: number;
}

export interface ChangeSetResult {
  result: true;
  siteId: number;
}

export default function createChangeSet(
  schemas: Schemas,
  current: Model,
  target: Model
) {
  if (current.__type !== target.__type) {
    return;
  }

  const schema = schemas[current.__type];
  if (!schema) return;

  for (const fieldName of Object.keys(schema.fields)) {
    const field = schema.fields[fieldName];
    if (field.type === 'array') {
    }
  }
}

function findModel(
  schemas: Schemas,
  model: Model,
  uuid: string,
  path: Array<AnyPathSegment> = []
): Array<AnyPathSegment> | null {
  if (!isModel(model)) {
    return null;
  }

  if (model.__uuid === uuid) {
    return path;
  }

  const schema = schemas[model.__type];
  if (!schema) {
    return null;
  }

  for (const fieldName of Object.keys(schema.fields)) {
    const field = schema.fields[fieldName];
    if (field.type === 'array' && field.member.type === 'instance') {
    } else if (field.type === 'instance') {
    }
  }

  return null;
}
