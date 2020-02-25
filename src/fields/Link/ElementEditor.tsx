import * as React from 'react';

import ElementSelect from '../../components/ElementSelect';
import { Link, ElementLinkType } from './Link';
import Input from '../../components/Input';

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
    <div className="tcfLinkWidget--editor">
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
      {linkType.allowHash ? (
        <div className="tcfLinkWidget--editorHash tcfInput--group">
          <div className="tcfInput--groupLabel">#</div>
          <Input
            disabled={disabled}
            value={link.hash}
            onChange={event =>
              onUpdate({ ...link, hash: event.currentTarget.value })
            }
          />
        </div>
      ) : null}
    </div>
  );
}
