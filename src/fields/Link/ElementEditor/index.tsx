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
  const data = link.elementId
    ? [{ id: link.elementId, siteId: link.siteId }]
    : [];

  return (
    <div className="tcfLinkWidget--editor">
      <ElementSelect
        allowSelfReference={linkType.allowSelf}
        criteria={linkType.criteria}
        data={data}
        disabled={disabled}
        elementType={linkType.elementType}
        limit={1}
        modalStorageKey={modalStorageKey}
        onUpdate={(references) =>
          onUpdate({
            ...link,
            elementId: references.length ? references[0].id : 0,
            siteId: references.length ? references[0].siteId : 0,
          })
        }
        showSiteMenu={linkType.showSiteMenu}
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
            siteId={link.siteId}
            value={link.hash}
          />
        </div>
      ) : null}
    </div>
  );
}
