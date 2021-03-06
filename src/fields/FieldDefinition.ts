import { SafeString } from 'handlebars';

import clone from '../utils/clone';
import Factory from '../components/Factory';
import { AnyPathSegment } from '../store/utils/parsePath';
import { SynchronizeOptions } from '../store/utils/synchronizeModels';

import {
  Field as BaseField,
  Reference,
  Schemas,
  Model,
  Schema,
} from '../store/models';

export interface CloneOptions<Field extends BaseField>
  extends SynchronizeOptions {
  field: Field;
  value: any;
}

export interface CreateOptions<Field extends BaseField> {
  field: Field;
  schema?: Schema;
  schemas: Schemas;
}

export type PreviewMode = 'default' | 'label';

export interface PreviewOptions<Field extends BaseField, Value> {
  context: PreviewContext;
  field?: Field;
  mode?: PreviewMode;
  value: Value;
}

export interface PreviewContext {
  depth: number;
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
  field: T;
  onCreate: (value: any) => void;
  scope?: string;
}

export type FactoryComponent<T extends BaseField> = React.ComponentType<
  FactoryProps<T>
>;

export interface WidgetProps<T extends BaseField> {
  className?: string;
  data: any;
  disabled?: boolean;
  errors: Array<string> | null;
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
  factory: FactoryComponent<Field>;
  isAlwaysPlainField?: boolean;
  widget: WidgetComponent<Field>;

  constructor({ factory, widget }: FieldDefinitionOptions<Field>) {
    this.factory = factory || (Factory as any);
    this.widget = widget;
  }

  async cloneValue(options: CloneOptions<Field>): Promise<Value> {
    const { field, value } = options;
    if (this.isValue(field, value)) {
      return clone(value);
    } else {
      return this.createValue(options);
    }
  }

  abstract createValue(options: CreateOptions<Field>): Value;

  abstract isValue(field: Field, value: any): value is Value;

  abstract preview(options: PreviewOptions<Field, Value>): PreviewResult;
}
