import { AnyField } from './fields';

export interface Schema {
  fields: { [name: string]: AnyField };
  icon: string;
  label: string;
  preview: string | null;
  previewTemplate: Handlebars.TemplateDelegate | null;
  qualifier: string;
}

export interface Schemas {
  [name: string]: Schema;
}
