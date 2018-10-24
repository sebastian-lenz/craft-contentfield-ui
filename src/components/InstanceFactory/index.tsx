import * as React from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import Icon from '../Icon';
import Select from '../Select';
import Text from '../Text';
import uuid from '../../store/utils/uuid';
import { InstanceField } from '../Field/Instance';
import { RootState, Schema } from '../../store/models';
import { FactoryProps } from '../Field/types';

export type ExternalProps = FactoryProps<InstanceField>;

export type Props = ExternalProps & {
  schemas: Array<Schema>;
};

export type State = {
  selectedSchema: Schema | null;
};

export class InstanceFactory extends React.Component<Props, State> {
  state: State = {
    selectedSchema: null,
  };

  handleCreate = () => {
    const { onCreate, schemas } = this.props;
    const { selectedSchema } = this.state;

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
  };

  handleSchemaChange = (selectedSchema: Schema) => {
    this.setState({ selectedSchema });
  };

  render() {
    const { label, schemas } = this.props;
    const { selectedSchema } = this.state;

    return (
      <div className="tcfFactory">
        {schemas.length > 1 ? (
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
  schemas: props.field.schemas.map(name => state.schemas[name]),
}))(InstanceFactory);
