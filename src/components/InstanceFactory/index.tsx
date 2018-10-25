import * as React from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import createModel from '../../store/utils/createModel';
import Icon from '../Icon';
import Select from '../Select';
import Text from '../Text';
import { FactoryProps } from '../../fields/FieldDefinition';
import { InstanceField } from '../../fields/Instance';
import { RootState, Schema, Schemas } from '../../store/models';

export type ExternalProps = FactoryProps<InstanceField>;

export type Props = ExternalProps & {
  available: Array<Schema>;
  schemas: Schemas;
};

export type State = {
  selectedSchema: Schema | null;
};

export class InstanceFactory extends React.Component<Props, State> {
  state: State = {
    selectedSchema: null,
  };

  handleCreate = () => {
    const { available, onCreate, schemas } = this.props;
    const { selectedSchema } = this.state;
    const schema = available.length === 1 ? available[0] : selectedSchema;
    if (!schema) {
      return;
    }

    return onCreate(
      createModel({
        schemas,
        schema,
      })
    );
  };

  handleSchemaChange = (selectedSchema: Schema) => {
    this.setState({ selectedSchema });
  };

  render() {
    const { available, label } = this.props;
    const { selectedSchema } = this.state;

    return (
      <div className="tcfFactory">
        {available.length > 1 ? (
          <Select
            onChange={this.handleSchemaChange}
            options={available.map(schema => ({
              key: schema,
              label: schema.label,
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
    if (props.available.length && !state.selectedSchema) {
      return { selectedSchema: props.available[0] };
    }

    return null;
  }
}

export default connect((state: RootState, props: ExternalProps) => ({
  schemas: state.schemas,
  available: props.field.schemas.map(name => state.schemas[name]),
}))(InstanceFactory);
