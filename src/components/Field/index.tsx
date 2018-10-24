import * as React from 'react';

import { Model } from '../../store/models';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { getComponent, AnyField } from './registry';

export interface Props {
  className?: string;
  data: any;
  model: Model;
  onUpdate: (value: any) => void;
  path: Array<AnyPathSegment>;
  field: AnyField;
}

export default class Widget extends React.Component<Props> {
  render() {
    const { className, data, model, onUpdate, path, field } = this.props;

    const component = getComponent(field);
    if (!component) {
      return <div>{`Could not resolve field type "${field.type}"`}</div>;
    }

    return React.createElement(component, {
      className,
      data,
      field,
      model,
      onUpdate,
      path,
    });
  }
}
