import cloneLayout from './cloneLayout';
import createLogger from './createLogger';
import synchronizeModels, { SynchronizeOptions } from './synchronizeModels';
import { Column, isLayout, Layout } from '../../fields/Layout/Layout';
import { LayoutField } from '../../fields/Layout';
import { Model } from '../models';

export interface SynchronizeLayoutsOptions extends SynchronizeOptions {
  field: LayoutField;
  source: Layout | undefined;
  target: Layout | undefined;
}

export default async function synchronizeLayouts({
  field,
  source,
  target,
  ...options
}: SynchronizeLayoutsOptions): Promise<Layout | undefined> {
  const l = createLogger(options);
  if (!isLayout(source)) {
    l.info(`No source, skipping ${field.name}`);
    return target;
  }

  if (!isLayout(target)) {
    if (target) {
      l.info(`Type missmatch, cloning ${field.name}`);
    } else {
      l.info(`No target, cloning ${field.name}`);
    }

    return cloneLayout({
      ...options,
      source,
    });
  }

  l.group(`Syncing layouts ${field.name}`);

  const columns: Array<Column> = [];
  for (let index = 0; index < source.columns.length; index++) {
    const column = source.columns[index];
    const model = (await synchronizeModels({
      ...options,
      source: column,
      target: target.columns[index],
    })) as Model & { value: any };

    columns.push({
      ...model,
      __role: 'layoutColumn',
      offset: { ...column.offset },
      order: { ...column.order },
      width: { ...column.width },
    });
  }

  l.groupEnd();
  return { ...target, columns, preset: source.preset };
}
