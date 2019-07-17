import { AnyField, FieldType } from '../../fields';
import { StyleGroup } from '../utils/pickStyle';

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
  style?: StyleGroup | null;
  type: FieldType;
  validatorId?: string;
}

export interface FieldMap {
  [name: string]: AnyField;
}

export interface FieldGroup {
  label?: string;
  style?: StyleGroup | null;
}

export interface Schema {
  fields: FieldMap;
  icon: string;
  label: string;
  preview: string | null;
  previewImage?: string | null;
  previewLabel?: string | null;
  previewLabelTemplate: Handlebars.TemplateDelegate | null;
  previewTemplate: Handlebars.TemplateDelegate | null;
  qualifier: string;
  style?: StyleGroup | null;
}

export interface Schemas {
  [name: string]: Schema;
}
