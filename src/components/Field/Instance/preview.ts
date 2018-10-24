import isModel from '../../../store/utils/isModel';
import { InstanceField } from '.';
import { PreviewContext } from '../../InstancePreview';
import { getDefinition } from '../registry';

export default function preview(
  value: any,
  field: InstanceField | undefined,
  context: PreviewContext
): any {
  if (!isModel(value)) {
    return null;
  }

  const schema = context.schemas[value.__type];
  if (!schema) {
    return null;
  }

  const { previewTemplate } = schema;
  if (previewTemplate === null) {
    return Craft.t(context.i18nCategory, schema.label);
  }

  const data: any = {
    toString: () => previewTemplate(data),
  };

  for (const name of Object.keys(schema.fields)) {
    const field = schema.fields[name];
    const definition = getDefinition(field);
    if (definition) {
      data[name] = definition.preview(value[name], field, context);
    }
  }

  return data;
}
