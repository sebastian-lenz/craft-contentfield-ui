import { createAssetPreview } from './AssetPreview';
import { createOEmbedPreview } from './OEmbedPreview';
import { Props } from './index';

import type { RootState } from '../../store/models';
import findSchema from '../../store/utils/findSchema';

function createFieldPreview(
  props: Props,
  state: RootState,
  name: string
): JSX.Element | null {
  const splitAt = name.indexOf('.');
  let path = '';
  if (splitAt !== -1) {
    path = name.substring(splitAt + 1);
    name = name.substring(0, splitAt);
  }

  const field = props.schema.fields[name];
  if (!field || !(name in props.model)) {
    return null;
  }

  const value = props.model[name];
  switch (field.type) {
    case 'oembed':
      return createOEmbedPreview(props, value);
    case 'reference':
      return createAssetPreview(props, value, state.config.references);
    case 'instance':
      const schema = path ? findSchema(state, value) : null;
      if (!schema) {
        return null;
      }

      return createFieldPreview(
        { ...props, model: value, schema },
        state,
        path
      );
    default:
      return null;
  }
}

export function createPreview(props: Props, state: RootState) {
  const { previewImages } = props.schema;
  if (!previewImages) {
    return null;
  }

  return previewImages.reduce(
    (result, name) => result || createFieldPreview(props, state, name),
    null as JSX.Element | null
  );
}
