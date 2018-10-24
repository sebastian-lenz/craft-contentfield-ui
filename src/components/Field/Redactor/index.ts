import createFactory from '../../Factory/createFactory';
import widget from './Widget';
import { Field } from '../../../store/models';
import { FieldDefinition } from '../types';
import { PreviewContext, Renderable } from '../../InstancePreview';
import { SafeString } from 'handlebars';

export interface RedactorField extends Field {
  redactor?: Craft.RedactorInputOptions;
  type: 'redactor';
}

function preview(
  value: any,
  field: RedactorField,
  context: PreviewContext
): Renderable | null {
  return new SafeString(
    `<div class="tcfInstancePreview--textSnippet">${value}</div>`
  );
}

const definition: FieldDefinition<RedactorField> = {
  factory: createFactory(() => ''),
  preview,
  type: 'redactor',
  widget,
};

export default definition;
