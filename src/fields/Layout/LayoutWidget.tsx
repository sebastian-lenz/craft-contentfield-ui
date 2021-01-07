import * as React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';

import Field from '../../components/Field';
import FieldPanel from '../../components/FieldPanel';
import LayoutSelect from '../../components/LayoutSelect';
import { getColumnName } from '../../components/LayoutPreview';
import { LayoutField } from './index';
import { RootState, Schemas } from '../../store/models';
import { WidgetProps } from '../FieldDefinition';
import { Context } from '../../contexts/ResponsiveStateProvider';

import {
  Column,
  createColumn,
  createColumnValue,
  getColumnMember,
  isLayout,
  LayoutPreset,
} from './Layout';

import './LayoutWidget.styl';

export interface ExternalProps extends WidgetProps<LayoutField> {}

export interface Props extends ExternalProps {
  schemas: Schemas;
}

export class LayoutWidget extends React.Component<Props> {
  static contextType = Context;
  declare context: React.ContextType<typeof Context>;

  createColumn(): Column {
    const { field, schemas } = this.props;
    return createColumn(field, schemas);
  }

  createColumnValue(): any {
    const { field, schemas } = this.props;
    return createColumnValue(field, schemas);
  }

  handleCreate = (): string | null => {
    const { data, disabled, field, onUpdate } = this.props;
    if (
      !isLayout(data) ||
      disabled ||
      data.columns.length >= field.constraints.maxColumns
    ) {
      return null;
    }

    const column = this.createColumn();
    onUpdate({
      ...data,
      columns: [...data.columns, column],
    });

    return column.__uuid;
  };

  handleDelete = (uid: string) => {
    const { data, disabled, field, onUpdate } = this.props;
    if (
      !isLayout(data) ||
      disabled ||
      data.columns.length <= field.constraints.minColumns
    ) {
      return;
    }

    onUpdate({
      ...data,
      columns: data.columns.filter((column) => column.__uuid !== uid),
    });
  };

  handlePreset = (preset: LayoutPreset) => {
    const { data, disabled, field, onUpdate, schemas } = this.props;
    if (disabled || !isLayout(data)) return;

    const values = data.columns.map((column) => column.value);

    onUpdate({
      ...data,
      preset: preset.key,
      columns: preset.columns.map((column, index) =>
        createColumn(
          field,
          schemas,
          column,
          values.length > index ? values[index] : undefined
        )
      ),
    });
  };

  handleUpdate = (uid: string, update: Partial<Column>) => {
    const { data, disabled, onUpdate } = this.props;
    if (disabled || !isLayout(data)) return;

    const isValue = Object.keys(update).every((key) => key === 'value');

    onUpdate({
      ...data,
      preset: isValue ? data.preset : null,
      columns: data.columns.map((column) =>
        column.__uuid === uid ? { ...column, ...update } : column
      ),
    });
  };

  render() {
    const { data, disabled, field, model, path, schemas } = this.props;
    const member = getColumnMember(field, schemas);
    const stackableColumns = this.context + 1;

    const { preset, columns } = isLayout(data)
      ? data
      : { columns: [] as Array<Column>, preset: null };

    return (
      <div className="tcfLayoutWidget">
        <LayoutSelect
          breakpoints={field.breakpoints}
          canEdit={field.canEdit}
          constraints={field.constraints}
          columns={columns}
          columnsPerRow={field.columnsPerRow}
          onCreate={this.handleCreate}
          onDelete={this.handleDelete}
          onPreset={this.handlePreset}
          onUpdate={this.handleUpdate}
          preset={preset}
          presets={field.presets}
        />

        <div
          className={cx('tcfLayoutWidget--columns', {
            isStacked: columns.length <= stackableColumns,
          })}
        >
          {columns.map((column, index) => (
            <FieldPanel key={column.__uuid} label={getColumnName(index)}>
              <Field
                data={column.value}
                disabled={disabled}
                errors={null}
                field={member}
                model={model}
                onUpdate={(value) =>
                  this.handleUpdate(column.__uuid, { value })
                }
                path={[
                  ...path,
                  { name: field.name, type: 'property' },
                  { index, name: 'columns', type: 'index' },
                ]}
              />
            </FieldPanel>
          ))}
        </div>
      </div>
    );
  }
}

export default connect((state: RootState, props: ExternalProps) => ({
  schemas: state.schemas,
}))(LayoutWidget);
