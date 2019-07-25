import $ from 'jquery';
import Handlebars from 'handlebars';

import isModel from './isModel';
import createModel from './createModel';
import { FavoriteSchemas, UserState } from '../models/user';
import { RootState, Schema } from '../models';
import { setGoogleMapsApiKey } from '../../fields/Location/utils/requireGoogleMaps';
import { toUuidObjects } from './uuidObject';
import { userSettingStorageKey } from '../actions/setUser';

function toTemplate(value?: string | null) {
  return typeof value === 'string' && value.trim() !== ''
    ? Handlebars.compile(value)
    : null;
}

function validateFavorites(favorites: FavoriteSchemas): FavoriteSchemas {
  return Object.keys(favorites).reduce(
    (memo, key) =>
      Array.isArray(favorites[key]) ? { ...memo, [key]: favorites[key] } : memo,
    {} as FavoriteSchemas
  );
}

function loadUserState(): UserState {
  try {
    const rawUserState = window.localStorage.getItem(userSettingStorageKey);
    if (rawUserState === null) {
      throw new Error('User state missing');
    }

    const { favoriteSchemas = {} } = JSON.parse(rawUserState) as UserState;
    return {
      favoriteSchemas: validateFavorites(favoriteSchemas),
    };
  } catch (error) {}

  return {
    favoriteSchemas: {},
  };
}

export default function loadRootState(
  script: Element,
  field: HTMLInputElement
): RootState {
  const payload = JSON.parse(script.innerHTML) as RootState;

  payload.user = loadUserState();
  payload.sync = {
    status: 'idle',
  };

  payload.config.references = payload.config.references.map(reference => {
    const $element = $(reference.element);
    return {
      ...reference,
      $element,
      hasThumb: $element.hasClass('hasthumb'),
    };
  });

  for (const name of Object.keys(payload.schemas)) {
    const schema = payload.schemas[name];
    schema.previewTemplate = toTemplate(schema.preview);
    schema.previewLabelTemplate =
      toTemplate(schema.previewLabel) || schema.previewTemplate;
  }

  setGoogleMapsApiKey(payload.config.googleMapsApiKey);

  let rootSchema: Schema | undefined = undefined;
  if (payload.config.rootSchemas.length === 1) {
    rootSchema = payload.schemas[payload.config.rootSchemas[0]];
  }

  try {
    payload.model = toUuidObjects(JSON.parse(field.value), payload.schemas);
  } catch (error) {}

  if (
    rootSchema &&
    (!isModel(payload.model) || payload.model.__type !== rootSchema.qualifier)
  ) {
    payload.model = createModel({
      oldModel: payload.model,
      schema: rootSchema,
      schemas: payload.schemas,
    });
  }

  return payload;
}
