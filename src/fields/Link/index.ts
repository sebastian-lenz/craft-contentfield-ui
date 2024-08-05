import LinkWidget from './LinkWidget';
import { Field } from '../../store/models';

import FieldDefinition from '../FieldDefinition';
import { isLink, Link, LinkTypeMap } from './Link';
import { translateReferenceSiteId } from '@app/store/utils/translateReferenceSiteId';
import type { PreviewResult, CloneOptions } from '../FieldDefinition';

export interface LinkField extends Field {
  type: 'link';
  allowNewWindow: boolean;
  linkTypes: LinkTypeMap;
}

export default class LinkFieldType extends FieldDefinition<LinkField, Link> {
  constructor() {
    super({
      widget: LinkWidget,
    });
  }

  async cloneValue(options: CloneOptions<LinkField>): Promise<Link> {
    const result = await super.cloneValue(options);
    result.siteId = await translateReferenceSiteId(
      result.elementId,
      result.siteId,
      options
    );

    return result;
  }

  createValue(): Link {
    return {
      elementId: 0,
      hash: '',
      openInNewWindow: false,
      siteId: 0,
      type: 'url',
      url: '',
    };
  }

  isValue(field: LinkField, value: any): value is Link {
    return isLink(value);
  }

  preview(): PreviewResult {
    return '';
  }
}
