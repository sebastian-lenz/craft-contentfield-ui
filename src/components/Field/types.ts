import { AnyPathSegment } from '../../store/utils/parsePath';
import { Field, Model } from '../../store/models';
import { PreviewContext } from '../InstancePreview';

export interface FieldPreview<T extends Field> {
  (data: any, field: T, context: PreviewContext): any;
}

export interface FieldDefinition<T extends Field> {
  factory: FactoryComponent<T>;
  fieldType?: T;
  preview: FieldPreview<T>;
  type: T['type'];
  widget: WidgetComponent<T>;
}

export type FieldDefinitionMap = {
  [type: string]: FieldDefinition<any>;
};

export interface FactoryProps<T extends Field> {
  label?: string;
  field: T;
  onCreate: (value: any) => void;
}

export type FactoryComponent<T extends Field> = React.ComponentType<
  FactoryProps<T>
>;

export interface WidgetProps<T extends Field> {
  className?: string;
  data: any;
  model: Model;
  field: T;
  onUpdate: (value: any) => void;
  path: Array<AnyPathSegment>;
}

export type WidgetComponent<T extends Field> = React.ComponentType<
  WidgetProps<T>
>;
