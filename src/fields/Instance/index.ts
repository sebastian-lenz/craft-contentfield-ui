import createModel from '../../store/utils/createModel';
import fields from '../index';
import InstanceFactory from '../../components/InstanceFactory';
import InstanceWidget from './InstanceWidget';
import isModel from '../../store/utils/isModel';
import { Field, Model } from '../../store/models';

import FieldDefinition, {
  PreviewResult,
  PreviewOptions,
  CreateOptions,
  PreviewObject,
} from '../FieldDefinition';

export interface InstanceField extends Field {
  schemas: Array<string>;
  type: 'instance';
}

export default class InstanceFieldType extends FieldDefinition<
  InstanceField,
  Model
> {
  constructor() {
    super({
      factory: InstanceFactory as any,
      widget: InstanceWidget,
    });
  }

  createValue({ field, schema, schemas }: CreateOptions<InstanceField>): Model {
    if (!schema) {
      schema = schemas[field.schemas[0]];
    }

    if (!schema) {
      throw new Error(
        'The option `schema` is required when creating instances.'
      );
    }

    return createModel({ schema, schemas });
  }

  isValue(field: InstanceField, value: any): value is Model {
    return isModel(value);
  }

  preview({
    context,
    value,
  }: PreviewOptions<InstanceField, Model>): PreviewResult {
    const schema = context.schemas[value.__type];
    if (!schema) {
      return '';
    }

    const { previewTemplate } = schema;
    if (previewTemplate === null) {
      return Craft.t(context.i18nCategory, schema.label);
    }

    const data: PreviewObject = {
      toHTML: () => previewTemplate(data),
      toString: () => previewTemplate(data),
    };

    for (const name of Object.keys(schema.fields)) {
      const field = schema.fields[name];
      const definition = fields.getDefinition(field);
      if (definition) {
        data[name] = definition.preview({
          context,
          field,
          value: value[name],
        });
      }
    }

    return data;
  }
}
