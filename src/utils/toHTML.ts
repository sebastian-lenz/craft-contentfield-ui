import { PreviewResult } from '../fields/FieldDefinition';

export default function toHTML(value: PreviewResult): string {
  while (typeof value !== 'string') {
    value = value.toHTML();
  }

  return value;
}
