import Factory from '../components/Factory';
import { AnyPathSegment } from '../store/utils/parsePath';
import { SafeString } from 'handlebars';

import {
  Field as BaseField,
  Reference,
  Schemas,
  Model,
  Schema,
} from '../store/models';

export interface CreateOptions<Field extends BaseField> {
  field: Field;
  schema?: Schema;
  schemas: Schemas;
}

export interface PreviewOptions<Field extends BaseField, Value> {
  field?: Field;
  value: Value;
  context: PreviewContext;
}

export interface PreviewContext {
  depth: number;
  i18nCategory: string;
  references: Array<Reference>;
  schemas: Schemas;
}

export type PreviewObject = {
  toHTML: () => SafeString;
  [name: string]: any;
};

export type PreviewResult = string | SafeString | PreviewObject;

export interface FieldDefinitionOptions<T extends BaseField> {
  widget: WidgetComponent<T>;
  factory?: FactoryComponent<T>;
}

export interface FactoryProps<T extends BaseField> {
  label?: string;
  field: T;
  onCreate: (value: any) => void;
}

export type FactoryComponent<T extends BaseField> = React.ComponentType<
  FactoryProps<T>
>;

export interface WidgetProps<T extends BaseField> {
  className?: string;
  data: any;
  model: Model;
  field: T;
  onUpdate: (value: any) => void;
  path: Array<AnyPathSegment>;
}

export type WidgetComponent<T extends BaseField> = React.ComponentType<
  WidgetProps<T>
>;

export default abstract class FieldDefinition<
  Field extends BaseField = BaseField,
  Value = any
> {
  field?: Field;
  widget: WidgetComponent<Field>;
  factory: FactoryComponent<Field>;

  constructor({ factory, widget }: FieldDefinitionOptions<Field>) {
    this.factory = factory || (Factory as any);
    this.widget = widget;
  }

  abstract createValue(options: CreateOptions<Field>): Value;

  abstract isValue(field: Field, value: any): value is Value;

  abstract preview(options: PreviewOptions<Field, Value>): PreviewResult;
}
