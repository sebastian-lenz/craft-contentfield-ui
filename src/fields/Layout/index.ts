import { SafeString } from 'handlebars';

import LayoutWidget from './LayoutWidget';
import fieldManager from '../index';
import toHTML from '../../utils/toHTML';
import uuid from '../../store/utils/uuid';
import { Field } from '../../store/models';
import {
  Column,
  createColumn,
  getBreakpointValue,
  getColumnMember,
  isLayout,
  Layout,
  LayoutBreakpoint,
  LayoutConstraints,
  LayoutPreset,
} from './Layout';

import FieldDefinition, {
  CloneOptions,
  CreateOptions,
  PreviewResult,
  PreviewOptions,
} from '../FieldDefinition';

export interface LayoutField extends Field {
  breakpoints: Array<LayoutBreakpoint>;
  canEdit: boolean;
  columnTypeQualifier: string;
  columnsPerRow: number;
  constraints: LayoutConstraints;
  defaultPreset: string | null;
  presets: Array<LayoutPreset>;
  type: 'layout';
}

export default class ColumnsFieldType extends FieldDefinition<
  LayoutField,
  Layout
> {
  constructor() {
    super({
      widget: LayoutWidget,
    });
  }

  async cloneValue(options: CloneOptions<LayoutField>): Promise<Layout> {
    const { field, value, ...syncOptions } = options;
    const { schemas } = syncOptions;
    if (!this.isValue(field, value)) {
      return this.createValue(options);
    }

    const member = getColumnMember(field, schemas);
    const definition = fieldManager.getDefinition(member);
    const columns: Array<Column> = [];

    for (let index = 0; index < value.columns.length; index++) {
      const column = value.columns[index];
      const columnValue = await definition.cloneValue({
        field: member,
        value: column.value,
        ...syncOptions,
      });

      columns.push(createColumn(field, schemas, column, columnValue));
    }

    return {
      __role: 'layout',
      __uuid: uuid(),
      preset: value.preset,
      columns,
    };
  }

  createValue({ field, schemas }: CreateOptions<LayoutField>): Layout {
    const preset = this.getDefaultPreset(field);
    let columns: Array<Column>;

    if (preset) {
      columns = preset.columns.map((columnPreset) =>
        createColumn(field, schemas, columnPreset)
      );
    } else {
      columns = [];
      while (columns.length < field.constraints.minColumns) {
        columns.push(createColumn(field, schemas));
      }
    }

    return {
      __role: 'layout',
      __uuid: uuid(),
      preset: preset ? preset.key : null,
      columns,
    };
  }

  getDefaultPreset({
    defaultPreset,
    presets,
  }: LayoutField): LayoutPreset | null {
    const fallback = presets.length ? presets[0] : null;
    return presets.find((preset) => preset.key === defaultPreset) || fallback;
  }

  isValue(field: LayoutField, value: any): value is Layout {
    return isLayout(value);
  }

  preview({
    context,
    field,
    value,
  }: PreviewOptions<LayoutField, Layout>): PreviewResult {
    if (!field) return '';
    const { breakpoints, columnsPerRow } = field;
    const member = getColumnMember(field, context.schemas);
    const definition = fieldManager.getDefinition(member);
    const state = {
      breakpoints,
      current: breakpoints[breakpoints.length - 1],
    };

    const columns = value.columns.map((column) => {
      const order = getBreakpointValue(column.order, state);
      const offset = getBreakpointValue(column.offset, state) / columnsPerRow;
      const width = getBreakpointValue(column.width, state) / columnsPerRow;
      const style = [
        `margin-left:${(offset * 100).toFixed(6)}%`,
        `order:${order}`,
        `width:${(width * 100).toFixed(6)}%`,
      ].join(';');

      const preview = definition.preview({
        context,
        field: member,
        value: column.value,
      });

      return `<div style="${style}">${toHTML(preview)}</div>`;
    });

    return new SafeString(`<div class="row">${columns.join('')}</div>`);
  }
}
