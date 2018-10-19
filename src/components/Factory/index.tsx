import * as React from 'react';
import { connect } from 'react-redux';

import { AnyField, RootState, Schema } from '../../store/models';
import Select from '../Select';
import uuid from '../../store/utils/uuid';
import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';

import './index.styl';

export interface ExternalProps {
  label?: string;
  field: AnyField;
  onCreate: (value: any) => void;
}

export interface Props extends ExternalProps {
  schemas: Array<Schema>;
}

export interface State {
  selectedSchema: Schema | null;
}

export class Factory extends React.Component<Props, State> {
  state: State = {
    selectedSchema: null,
  };

  handleCreate = () => {
    const { field, onCreate, schemas } = this.props;
    const { selectedSchema } = this.state;

    switch (field.type) {
      case 'array':
        return onCreate([]);
      case 'instance':
        if (schemas.length === 1) {
          return onCreate({
            __type: schemas[0].qualifier,
            __uuid: uuid(),
          });
        } else if (selectedSchema) {
          return onCreate({
            __type: selectedSchema.qualifier,
            __uuid: uuid(),
          });
        }
        return;

      case 'reference':
        return onCreate(-1);
      case 'string':
        return onCreate('');
    }
  };

  handleSchemaChange = (selectedSchema: Schema) => {
    this.setState({ selectedSchema });
  };

  render() {
    const { label, field, schemas } = this.props;
    const { selectedSchema } = this.state;

    return (
      <div className="tcfFactory">
        {field.type === 'instance' && schemas.length > 1 ? (
          <Select
            onChange={this.handleSchemaChange}
            options={schemas.map(schema => ({
              key: schema.qualifier,
              label: schema.label,
              value: schema,
            }))}
            value={selectedSchema}
          />
        ) : null}
        <Button onClick={this.handleCreate} secondary>
          <Text value={label || 'Create'} />
          <Icon name="plus" />
        </Button>
      </div>
    );
  }

  static getDerivedStateFromProps(props: Props, state: State): State | null {
    if (props.schemas.length && !state.selectedSchema) {
      return { selectedSchema: props.schemas[0] };
    }

    return null;
  }
}

export default connect((state: RootState, props: ExternalProps) => ({
  schemas:
    props.field.type === 'instance'
      ? props.field.schemas.map(name => state.schemas[name])
      : [],
}))(Factory);
