import { SafeString } from 'handlebars';

import fields from '../index';
import toHTML from '../../utils/toHTML';
import { ArrayPreviewOptions } from './index';
import { PreviewResult } from '../FieldDefinition';

function createItems({
  context,
  field,
  value,
}: ArrayPreviewOptions): Array<PreviewResult> {
  if (!field) return [];
  const { member } = field;
  const definition = fields.getDefinition(member);

  return value.map(value =>
    definition.preview({
      value,
      field: member,
      context,
    })
  );
}

export default class ArrayPreview extends Array<PreviewResult> {
  constructor(options: ArrayPreviewOptions) {
    super(...createItems(options));
  }

  get asList(): SafeString {
    return new SafeString(
      `<ul>${this.map(item => `<li>${toHTML(item)}</li>`).join('')}</ul>`
    );
  }

  toHTML(): SafeString {
    return new SafeString(this.toString());
  }

  toString(): string {
    return this.map(item => toHTML(item)).join('');
  }
}
