export type FieldTypeMap = {
  array: ArrayField;
  instance: InstanceField;
  reference: ReferenceField;
  string: StringField;
};

export type FieldType = keyof FieldTypeMap;

export type AnyField = FieldTypeMap[keyof FieldTypeMap];

export interface Widget {
  type: string;
  [name: string]: any;
}

export interface Field<
  TFieldType extends FieldType = FieldType,
  TWidget extends Widget = Widget
> {
  label: string;
  name: string;
  type: TFieldType;
  widget: TWidget;
}

export interface ArrayField<TWidget extends Widget = Widget>
  extends Field<'array', TWidget> {
  member: AnyField;
}

export interface InstanceField<TWidget extends Widget = Widget>
  extends Field<'instance', TWidget> {
  schemas: Array<string>;
}

export interface ReferenceField<TWidget extends Widget = Widget>
  extends Field<'reference', TWidget> {
  elementType: string;
  limit: number | null;
  sources: string[] | null;
  viewMode: 'large' | 'small';
}

export interface StringField<TWidget extends Widget = Widget>
  extends Field<'string', TWidget> {}
