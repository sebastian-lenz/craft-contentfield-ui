import { AnyField, FieldType } from '../../fields';

export type FieldRule = {
  options?: any;
  type: string;
};

export interface Field {
  group?: FieldGroup;
  instructions?: string;
  isRequired?: boolean;
  label: string;
  name: string;
  type: FieldType;
  validatorId?: string;
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
