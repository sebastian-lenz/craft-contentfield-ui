import fieldManager from '../index';
import uuid from '../../store/utils/uuid';
import { LayoutField } from '.';
import { Model, Schemas } from '../../store/models';
import findSchema from '../../store/utils/findSchema';

export interface Layout {
  __role: 'layout';
  __uuid: string;
  preset: string | null;
  columns: Array<Column>;
}

export interface LayoutConstraints {
  maxColumns: number;
  maxColumnWidth: number;
  minColumns: number;
  minColumnWidth: number;
}

export interface LayoutPreset {
  columns: Array<ColumnPreset>;
  key: string;
  label: string;
}

export interface Column extends ColumnPreset, Model {
  __role: 'layoutColumn';
  value: any;
}

export interface ColumnPreset {
  offset: LayoutBreakpointMap;
  order: LayoutBreakpointMap;
  width: LayoutBreakpointMap;
}

export interface LayoutBreakpoint {
  index: number;
  key: string;
  label: string;
}

export interface LayoutBreakpointMap {
  [name: string]: number;
}

export interface LayoutBreakpointState {
  breakpoints: Array<LayoutBreakpoint>;
  current: LayoutBreakpoint;
}

export function compressBreakpointMap(
  map: LayoutBreakpointMap,
  defaultValue: number,
  { breakpoints }: LayoutBreakpointState
) {
  let lastValue = NaN;
  return breakpoints.reduce((result, { key }) => {
    let nextValue = isNaN(lastValue) ? defaultValue : lastValue;
    if (key in map) {
      nextValue = map[key];
    }

    if (nextValue !== lastValue) {
      lastValue = nextValue;
      result[key] = nextValue;
    }

    return result;
  }, {} as LayoutBreakpointMap);
}

export function createColumn(
  field: LayoutField,
  schemas: Schemas,
  preset?: ColumnPreset,
  value?: any
): Column {
  const { key } = field.breakpoints[0];

  return {
    __errors: {},
    __role: 'layoutColumn',
    __type: field.columnTypeQualifier,
    __uuid: uuid(),
    __visible: true,
    offset: preset ? { ...preset.offset } : { [key]: 0 },
    order: preset ? { ...preset.order } : { [key]: 0 },
    value: value ? value : createColumnValue(field, schemas),
    width: preset
      ? { ...preset.width }
      : { [key]: field.constraints.minColumnWidth },
  };
}

export function createColumnValue(field: LayoutField, schemas: Schemas): any {
  const member = getColumnMember(field, schemas);
  const definition = fieldManager.getDefinition(member);
  return definition.createValue({ field: member, schemas });
}

export function getBreakpointValue(
  map: LayoutBreakpointMap,
  { breakpoints, current }: LayoutBreakpointState
): number {
  for (let index = current.index; index >= 0; index--) {
    const { key } = breakpoints[index];
    if (key in map) {
      return map[key];
    }
  }

  return 0;
}

export function getColumnMember(field: LayoutField, schemas: Schemas) {
  const schema = schemas[field.columnTypeQualifier];
  return schema.fields.value;
}

export function setBreakpointValue(
  map: LayoutBreakpointMap,
  value: number,
  state: LayoutBreakpointState
): LayoutBreakpointMap {
  const { current } = state;
  return compressBreakpointMap({ ...map, [current.key]: value }, 0, state);
}

export function isLayout(value: any): value is Layout {
  return (
    typeof value === 'object' &&
    '__uuid' in value &&
    '__role' in value &&
    value.__role === 'layout'
  );
}
