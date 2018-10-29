import { AnyField, FieldType } from '../../fields';

export interface Field {
  group?: FieldGroup;
  label: string;
  name: string;
  type: FieldType;
  width: number;
}

export interface FieldMap {
  [name: string]: AnyField;
}

export interface FieldGroup {
  label?: string;
  style?: React.CSSProperties;
}

export interface Schema {
  fields: FieldMap;
  grid?: string;
  icon: string;
  label: string;
  preview: string | null;
  previewTemplate: Handlebars.TemplateDelegate | null;
  qualifier: string;
}

export interface Schemas {
  [name: string]: Schema;
}
