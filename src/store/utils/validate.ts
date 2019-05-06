import api from '../../index';
import isModel from './isModel';
import { RootState, ErrorMap, Schema } from '../models';

function validateField(
  schema: Schema,
  model: any,
  fieldName: string
): Array<string> | null {
  const { validatorId } = schema.fields[fieldName];
  if (!validatorId) {
    return null;
  }

  const validator = api.getValidator(validatorId);
  if (!validator) {
    return null;
  }

  const messages: Array<string> = [];
  validator(fieldName, model[fieldName], messages);
  return messages;
}

export default function validate(state: RootState, model: any) {
  if (!isModel(model)) return;

  const schema = state.schemas[model.__type];
  if (!schema) return;

  model.__errors = Object.keys(schema.fields).reduce(
    (errors: ErrorMap, fieldName: string) => {
      const fieldErrors = validateField(schema, model, fieldName);
      if (fieldErrors && fieldErrors.length) {
        errors[fieldName] = fieldErrors;
      }

      return errors;
    },
    {} as ErrorMap
  );
}
