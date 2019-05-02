import * as React from 'react';

import ElementSelect from '../../components/ElementSelect';
import { Link, LinkType, ElementLinkType } from './Link';

export interface Props {
  link: Link;
  linkType: ElementLinkType;
  onUpdate: (value: any) => void;
}

export default function ElementEditor({ link, linkType, onUpdate }: Props) {
  return (
    <ElementSelect
      criteria={linkType.criteria}
      data={[link.elementId]}
      elementType={linkType.elementType}
      limit={1}
      onUpdate={ids =>
        onUpdate({ ...link, elementId: ids.length ? ids[0] : 0 })
      }
      sources={linkType.sources}
      viewMode="small"
    />
  );
}
