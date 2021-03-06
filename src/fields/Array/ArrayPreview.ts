import { SafeString } from 'handlebars';

import fields from '../index';
import toHTML from '../../utils/toHTML';
import { ArrayPreviewOptions } from './index';
import { hbsProperty, hbsMethod } from '../../utils/hbsOptions';
import { PreviewResult } from '../FieldDefinition';

function createItems({
  context,
  field,
  value,
}: ArrayPreviewOptions): Array<PreviewResult> {
  if (!field) return [];
  const { member } = field;
  const definition = fields.getDefinition(member);

  return value.map((value) =>
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

  @hbsProperty
  get asColumn(): SafeString {
    return this.toList('flexColumn');
  }

  @hbsProperty
  get asList(): SafeString {
    return this.toList('');
  }

  @hbsProperty
  get asRow(): SafeString {
    return this.toList('flexRow');
  }

  @hbsProperty
  get first(): SafeString {
    return new SafeString(this.length ? toHTML(this[0]) : '');
  }

  @hbsProperty
  get one(): SafeString {
    return this.first;
  }

  @hbsMethod
  toHTML(): SafeString {
    return new SafeString(this.toString());
  }

  @hbsMethod
  toList(className: string): SafeString {
    return new SafeString(
      `<ul class="${className}">${this.map(
        (item) => `<li>${toHTML(item)}</li>`
      ).join('')}</ul>`
    );
  }

  @hbsMethod
  toString(): string {
    return this.map((item) => toHTML(item)).join('');
  }
}
