import * as React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import FieldGroup from '../../components/FieldGroup';
import FieldPanel from '../../components/FieldPanel';
import Select from '../../components/Select';
import Text from '../../components/Text';
import { Site, RootState } from '../../store/models';
import { synchronize } from '../../store/actions';
import { SynchronizeOptions } from '../../store/actions/synchronize';
import { TranslateOptions } from '../../store/utils/fetchTranslation';
import Window from '../../components/Window';

export type ExternalProps = {
  onClose: () => void;
};

export type Props = ExternalProps & {
  availableSites: Array<Site>;
  currentSite?: Site;
  endpoint: string;
  onSynchronize: (options: SynchronizeOptions) => void;
};

export interface State {
  site: Site | null;
  useTranslator: boolean;
}

export class Options extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      site: props.availableSites[0] || null,
      useTranslator: false,
    };
  }

  handleApply = () => {
    const { currentSite, endpoint } = this.props;
    const { site, useTranslator } = this.state;
    if (!site) return;

    let translate: TranslateOptions | undefined;
    if (
      useTranslator &&
      currentSite &&
      site.language !== currentSite.language
    ) {
      translate = {
        endpoint,
        source: site.language,
        target: currentSite.language,
      };
    }

    this.props.onSynchronize({
      siteId: site.id,
      translate,
    });
  };

  handleSiteChange = (site: Site) => {
    this.setState({ site });
  };

  handleToggleTranslator = (useTranslator: boolean) => {
    this.setState({ useTranslator });
  };

  render() {
    const { availableSites, currentSite, onClose } = this.props;
    const { site, useTranslator } = this.state;
    const siteOptions = availableSites.map(site => ({
      label: site.label,
      key: site,
    }));

    return (
      <>
        <Window.Content>
          <div className="tcfSynchronize--title">
            <Text value="Synchronize translations" />
          </div>

          <FieldGroup>
            <FieldPanel label="Source site">
              <Select
                onChange={this.handleSiteChange}
                options={siteOptions}
                value={site}
              />
            </FieldPanel>
            {site && currentSite && site.language !== currentSite.language ? (
              <Checkbox
                onChange={this.handleToggleTranslator}
                value={useTranslator}
              >
                <Text value="Use machine translation for all texts" />
              </Checkbox>
            ) : null}
          </FieldGroup>
        </Window.Content>
        <Window.Footer>
          <Button onClick={this.handleApply}>
            <Text value="Apply" />
          </Button>
          <Button onClick={onClose} secondary>
            <Text value="Cancel" />
          </Button>
        </Window.Footer>
      </>
    );
  }
}

export default connect(
  (state: RootState) => {
    const { elementSiteId, apiEndpoints, supportedSites } = state.config;

    return {
      availableSites: supportedSites.filter(site => site.id !== elementSiteId),
      currentSite: supportedSites.find(site => site.id === elementSiteId),
      endpoint: apiEndpoints.translate,
    };
  },
  dispatch => ({
    onSynchronize: (options: SynchronizeOptions) =>
      dispatch(synchronize(options)),
  })
)(Options);
