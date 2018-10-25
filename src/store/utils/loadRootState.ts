import $ from 'jquery';
import Handlebars from 'handlebars';

import isModel from './isModel';
import { RootState, Schema } from '../models';
import createModel from './createModel';

export default function loadRootState(
  script: Element,
  field: HTMLInputElement
): RootState {
  const payload = JSON.parse(script.innerHTML) as RootState;

  payload.config.expanded = [];

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
    if (typeof schema.preview === 'string') {
      schema.previewTemplate = Handlebars.compile(schema.preview);
    } else {
      schema.previewTemplate = null;
    }
  }

  let rootSchema: Schema | undefined = undefined;
  if (payload.config.rootSchemas.length === 1) {
    rootSchema = payload.schemas[payload.config.rootSchemas[0]];
  }

  try {
    payload.model = JSON.parse(field.value);
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
