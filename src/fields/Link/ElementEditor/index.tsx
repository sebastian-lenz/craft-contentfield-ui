import * as React from 'react';

import ElementSelect from '../../../components/ElementSelect';
import HashInput from './HashInput';
import { Link, ElementLinkType } from '../Link';

export interface Props {
  disabled?: boolean;
  link: Link;
  linkType: ElementLinkType;
  modalStorageKey?: string | null;
  onUpdate: (value: any) => void;
}

export default function ElementEditor({
  disabled,
  link,
  linkType,
  modalStorageKey = null,
  onUpdate,
}: Props) {
  if (linkType.allowHash) {
  }

  return (
    <div className="tcfLinkWidget--editor">
      <ElementSelect
        allowSelfReference={linkType.allowSelf}
        criteria={linkType.criteria}
        data={[link.elementId]}
        disabled={disabled}
        elementType={linkType.elementType}
        limit={1}
        modalStorageKey={modalStorageKey}
        onUpdate={(ids) =>
          onUpdate({ ...link, elementId: ids.length ? ids[0] : 0 })
        }
        sources={linkType.sources}
        viewMode="small"
      />
      {linkType.allowHash ? (
        <div className="tcfLinkWidget--editorHash tcfInput--group">
          <div className="tcfInput--groupLabel">#</div>
          <HashInput
            disabled={disabled}
            elementId={link.elementId}
            mode={linkType.allowHash}
            onChange={(hash) => onUpdate({ ...link, hash })}
            value={link.hash}
          />
        </div>
      ) : null}
    </div>
  );
}
