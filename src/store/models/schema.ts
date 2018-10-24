import { AnyField, FieldType } from '../../components/Field/registry';

export interface Field {
  group: string;
  label: string;
  name: string;
  type: FieldType;
  width: string;
}

export interface FieldMap {
  [name: string]: AnyField;
}

export interface Schema {
  fields: FieldMap;
  icon: string;
  label: string;
  preview: string | null;
  previewTemplate: Handlebars.TemplateDelegate | null;
  qualifier: string;
}

export interface Schemas {
  [name: string]: Schema;
}
