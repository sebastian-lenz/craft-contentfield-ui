import * as React from 'react';

import ElementSelect from '../../components/ElementSelect';
import { Link, ElementLinkType } from './Link';

export interface Props {
  disabled?: boolean;
  link: Link;
  linkType: ElementLinkType;
  onUpdate: (value: any) => void;
}

export default function ElementEditor({
  disabled,
  link,
  linkType,
  onUpdate,
}: Props) {
  return (
    <ElementSelect
      criteria={linkType.criteria}
      data={[link.elementId]}
      disabled={disabled}
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
