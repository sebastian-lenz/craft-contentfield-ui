import $ from 'jquery';
import Handlebars from 'handlebars';

import isModel from './isModel';
import { RootState } from '../models';

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

  try {
    payload.model = JSON.parse(field.value);
  } catch (error) {}

  if (!isModel(payload.model)) {
    payload.model = { __type: 'unknown', __uuid: '0' };
  }

  return payload;
}
