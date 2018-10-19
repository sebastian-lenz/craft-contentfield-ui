import * as React from 'react';
import { connect } from 'react-redux';

import Widget from '../Widget';
import { Model, RootState, Schema } from '../../store/models';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { updateValue } from '../../store/actions';
import FieldPanel from '../FieldPanel';

export interface ExternalProps {
  className?: string;
  model: Model;
  path: Array<AnyPathSegment>;
}

export interface Props extends ExternalProps {
  onUpdate: (key: string, value: any) => void;
  schema: Schema | null;
}

export class Instance extends React.Component<Props> {
  render() {
    const { className, model, onUpdate, path, schema } = this.props;
    if (!schema) {
      return (
        <div className={className}>{`Could not resolve schema for "${
          model.__type
        }"`}</div>
      );
    }

    return (
      <div className={className}>
        {Object.keys(schema.fields).map(name => (
          <FieldPanel key={name} label={schema.fields[name].label}>
            <Widget
              data={model[name]}
              field={schema.fields[name]}
              model={model}
              onUpdate={(value: any) => onUpdate(name, value)}
              path={path}
            />
          </FieldPanel>
        ))}
      </div>
    );
  }
}

export default connect(
  (state: RootState, props: ExternalProps) => ({
    schema: state.schemas[props.model.__type],
  }),
  (disptach, props) => ({
    onUpdate: (key: string, value: any) => {
      disptach(updateValue(props.path, key, value));
    },
  })
)(Instance);
