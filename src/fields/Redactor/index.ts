import { SafeString } from 'handlebars';

import RedactorWidget from './RedactorWidget';
import StringFieldDefinition from '../StringFieldDefinition';
import { Field } from '../../store/models';
import { PreviewResult, PreviewOptions } from '../FieldDefinition';
import RedactorPreview from './RedactorPreview';

export interface RedactorField extends Field {
  redactor?: Craft.RedactorInputOptions;
  type: 'redactor';
}

export default class RedactorFieldType extends StringFieldDefinition<
  RedactorField
> {
  constructor() {
    super({
      widget: RedactorWidget,
    });
  }

  preview({ value }: PreviewOptions<RedactorField, string>): PreviewResult {
    return new RedactorPreview(value);
  }
}
