import { createAssetPreview } from './AssetPreview';
import { createOEmbedPreview } from './OEmbedPreview';
import { Props } from './index';

import type { Reference } from '../../store/models';

function createFieldPreview(
  props: Props,
  references: Reference[],
  name: string
): JSX.Element | null {
  const field = props.schema.fields[name];
  if (!field || !(name in props.model)) {
    return null;
  }

  const value = props.model[name];
  switch (field.type) {
    case 'oembed':
      return createOEmbedPreview(props, value);
    case 'reference':
      return createAssetPreview(props, value, references);
    default:
      return null;
  }
}

export function createPreview(props: Props, references: Reference[]) {
  const { previewImages } = props.schema;
  if (!previewImages) {
    return null;
  }

  return previewImages.reduce(
    (result, name) => result || createFieldPreview(props, references, name),
    null as JSX.Element | null
  );
}
