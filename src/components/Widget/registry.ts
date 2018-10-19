import ArrayWidget from './ArrayWidget';
import InstanceWidget from './InstanceWidget';
import InputWidget from './InputWidget';
import ReferenceWidget from './ReferenceWidget';
import RedactorWidget from './RedactorWidget';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { Model, Field } from '../../store/models';

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

const widgets: any = {
  array: ArrayWidget,
  input: InputWidget,
  instance: InstanceWidget,
  redactor: RedactorWidget,
  reference: ReferenceWidget,
};

export function getComponent<T extends Field>(field: T): WidgetComponent<T> {
  return widgets[field.widget.type];
}
