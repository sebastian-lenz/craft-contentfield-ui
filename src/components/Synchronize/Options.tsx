import * as React from 'react';

import Select, { SelectOption } from '../Select';
import { Site, RootState } from '../../store/models';

import './Header.styl';
import { Text } from '../Text';
import { connect } from 'react-redux';
import FieldPanel from '../FieldPanel';

export interface Props {
  currentSite?: Site;
}

export class Options extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { currentSite } = this.props;

    return (
      <div>
        <FieldPanel label="Current site">
          {currentSite ? currentSite.label : '(Unknown)'}
        </FieldPanel>
      </div>
    );
  }
}

export default connect((state: RootState) => {
  const { elementSiteId, supportedSites } = state.config;

  return {
    currentSite: supportedSites.find(site => site.id === elementSiteId),
  };
})(Options);
