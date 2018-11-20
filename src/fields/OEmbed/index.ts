import OEmbedWidget from './OEmbedWidget';
import { Field } from '../../store/models';
import { isOEmbed, OEmbed } from './OEmbed';

import FieldDefinition, {
  CreateOptions,
  PreviewOptions,
  PreviewResult,
} from '../FieldDefinition';
import OEmbedPreview from './OEmbedPreview';

export interface OEmbedField extends Field {
  type: 'oembed';
}

export default class EmbedUrlFieldDefinition extends FieldDefinition<
  OEmbedField,
  OEmbed
> {
  constructor() {
    super({
      widget: OEmbedWidget,
    });
  }

  createValue(options: CreateOptions<OEmbedField>): OEmbed {
    return {
      url: '',
    };
  }

  isValue(field: OEmbedField, value: any): value is OEmbed {
    return isOEmbed(value);
  }

  preview({ value }: PreviewOptions<OEmbedField, OEmbed>): PreviewResult {
    return new OEmbedPreview(isOEmbed(value) ? value : { url: '' });
  }
}
