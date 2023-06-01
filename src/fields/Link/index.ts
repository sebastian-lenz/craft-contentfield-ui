import LinkWidget from './LinkWidget';
import { Field } from '../../store/models';

import FieldDefinition, { PreviewResult } from '../FieldDefinition';
import { isLink, Link, LinkTypeMap } from './Link';

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
