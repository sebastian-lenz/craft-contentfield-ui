import * as React from 'react';

import Select, { SelectOption } from '../Select';
import { Site } from '../../store/models';

import './Header.styl';

export interface Props {
  elementSiteId: number | null;
  onSiteChange: (siteId: number) => void;
  supportedSites: Array<Site>;
  targetSiteId: number;
}

export default function Header({
  elementSiteId,
  onSiteChange,
  supportedSites,
  targetSiteId,
}: Props) {
  const options: Array<SelectOption> = [];
  let currentSite: Site | undefined;
  for (const site of supportedSites) {
    if (site.id === elementSiteId) {
      currentSite = site;
    } else {
      options.push({
        key: site.id,
        label: site.label,
      });
    }
  }

  return (
    <div className="tcfSynchronizeHeader">
      <div className="tcfSynchronizeHeader--title">Synchronize sites</div>
      <div className="tcfSynchronizeHeader--sites">
        <div className="tcfSynchronizeHeader--site">
          <div className="tcfSynchronizeHeader--siteTitle">Target site</div>
          <div className="tcfSynchronizeHeader--siteStatic">
            {currentSite ? currentSite.label : 'Unknown'}
          </div>
        </div>
        <div className="tcfSynchronizeHeader--site">
          <div className="tcfSynchronizeHeader--siteTitle">Source site</div>
          <Select
            options={options}
            onChange={onSiteChange}
            value={targetSiteId}
          />
        </div>
      </div>
    </div>
  );
}
