import cloneModel from './cloneModel';
import uuid from './uuid';
import { Column, Layout } from '../../fields/Layout/Layout';
import { Model } from '../models';
import { SynchronizeOptions } from './synchronizeModels';

export interface CloneLayoutOptions extends SynchronizeOptions {
  source: Layout;
}

export default async function cloneLayout({
  source,
  ...options
}: CloneLayoutOptions): Promise<Layout> {
  const columns: Array<Column> = [];

  for (let index = 0; index < source.columns.length; index++) {
    const column = source.columns[index];
    const model = (await cloneModel({
      ...options,
      source: column,
    })) as Model & { value: any };

    columns.push({
      ...model,
      __role: 'layoutColumn',
      offset: { ...column.offset },
      order: { ...column.order },
      width: { ...column.width },
    });
  }

  const result: Layout = {
    __role: 'layout',
    __uuid: uuid(),
    columns,
    preset: source.preset,
  };

  return result;
}
