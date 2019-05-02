import { RootState, ErrorMap, Schema } from '../models';
import isModel from './isModel';
import validators from '../validators';

function validateField(
  schema: Schema,
  model: any,
  fieldName: string
): Array<string> | null {
  const { rules } = schema.fields[fieldName];
  if (!rules) {
    return null;
  }

  const value = model[fieldName];

  return rules.reduce(
    (errors, rule) => {
      if (!(rule.type in validators)) {
        return errors;
      }

      const error = validators[rule.type](value, rule.options);
      if (error) {
        errors.push(error);
      }

      return errors;
    },
    [] as Array<string>
  );
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
