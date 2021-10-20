import { Dispatch } from 'redux';

import addReferences from './addReferences';
import cloneModel from '../utils/cloneModel';
import fetchSite from '../utils/fetchSite';
import isModel from '../utils/isModel';
import synchronizeModels, { ArrayOrphanMode } from '../utils/synchronizeModels';
import updateSync from './updateSync';
import updateValue from './updateValue';
import { RootState } from '../models';
import { AnyAction } from './index';
import { TranslateOptions } from '../utils/fetchTranslation';

export interface SynchronizeOptions {
  arrayOrphanMode?: ArrayOrphanMode;
  csrfParams?: { [name: string]: string };
  siteId: number;
  translate?: TranslateOptions;
  verbose?: boolean;
}

async function applySynchronize(
  { siteId, ...options }: SynchronizeOptions,
  dispatch: Dispatch,
  getState: () => RootState
) {
  dispatch(
    updateSync({
      status: 'working',
    })
  );

  const { config, model, schemas } = getState();
  if (typeof config.elementId !== 'number') {
    throw new Error('Entry must be saved before it can be synchronized.');
  }

  const { data, references } = await fetchSite({
    apiEndpoint: config.apiEndpoints.fetchSite,
    elementId: config.elementId,
    fieldHandle: config.fieldHandle,
    siteId,
  });

  // Make sure sync target is a valid model for us
  if (
    !isModel(data) ||
    !config.rootSchemas.some((type) => type === data.__type)
  ) {
    throw new Error('Selected target site does not contain a valid model.');
  }

  if (options.translate) {
    options.translate.csrfParams = {
      [config.csrfTokenName]: config.csrfTokenValue,
    };
  }

  // If model types are different, clone the target, otherwise sync
  const isClone = !isModel(model) || model.__type !== data.__type;
  const syncedModel = isClone
    ? await cloneModel({
        ...options,
        schemas,
        source: data,
      })
    : await synchronizeModels({
        ...options,
        schemas,
        source: data,
        target: model,
      });

  dispatch(addReferences(references));
  dispatch(updateValue([], undefined, syncedModel));
  dispatch(updateSync({ status: 'finished' }));
}

export default function synchronize(options: SynchronizeOptions): AnyAction {
  return (async (dispatch: Dispatch, getState: any) => {
    try {
      await applySynchronize(options, dispatch, getState);
    } catch (error) {
      dispatch(
        updateSync({
          status: 'error',
          message: `${error}`,
        })
      );
    }
  }) as any;
}
