import { SafeString } from 'handlebars';

import cloneModel from '../../store/utils/cloneModel';
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
  CloneOptions,
} from '../FieldDefinition';

export interface InstanceField extends Field {
  collapsible?: boolean;
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

  async cloneValue(options: CloneOptions<InstanceField>): Promise<Model> {
    const { field, value, ...syncOptions } = options;
    if (this.isValue(field, value)) {
      return cloneModel({
        ...syncOptions,
        source: value,
      });
    } else {
      return this.createValue(options);
    }
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
    return isModel(value) && field.schemas.indexOf(value.__type) !== -1;
  }

  preview({
    context,
    mode = 'default',
    value,
  }: PreviewOptions<InstanceField, Model>): PreviewResult {
    if (!isModel(value)) {
      return '';
    }

    const schema = context.schemas[value.__type];
    if (!schema) {
      return '';
    }

    const template =
      mode === 'label' ? schema.previewLabelTemplate : schema.previewTemplate;

    if (template === null) {
      return schema.label;
    }

    const data: PreviewObject = {
      toHTML: () => new SafeString(template(data)),
      toString: () => template(data),
    };

    data.depth = context.depth;

    for (const name of Object.keys(schema.fields)) {
      const field = schema.fields[name];
      const definition = fields.getDefinition(field);
      if (definition) {
        data[name] = definition.preview({
          context: {
            ...context,
            depth: context.depth + 1,
          },
          field,
          value: value[name],
        });
      }
    }

    return data;
  }
}
