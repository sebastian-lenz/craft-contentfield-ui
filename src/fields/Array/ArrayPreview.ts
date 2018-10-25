import fields from '../index';
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

  toHTML(): string {
    return `<div>${this.map(
      item => (typeof item === 'object' ? item.toHTML() : item)
    ).join('')}</div>`;
  }
}
