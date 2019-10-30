import * as React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import FieldGroup from '../../components/FieldGroup';
import FieldPanel from '../../components/FieldPanel';
import Lightswitch from '../../components/Lightswitch';
import Select from '../../components/Select';
import Text from '../../components/Text';
import translate from '../../store/utils/translate';
import Window from '../../components/Window';
import { Site, RootState } from '../../store/models';
import { synchronize } from '../../store/actions';
import { SynchronizeOptions } from '../../store/actions/synchronize';
import { TranslateOptions } from '../../store/utils/fetchTranslation';

export type ExternalProps = {
  onClose: () => void;
};

export type Props = ExternalProps & {
  availableSites: Array<Site>;
  currentSite?: Site;
  endpoint: string;
  hasTranslator: boolean;
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

  handleApply = (event: React.SyntheticEvent) => {
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
      verbose: 'altKey' in event && (event as any).altKey,
    });
  };

  handleSiteChange = (site: Site) => {
    this.setState({ site });
  };

  handleToggleTranslator = (useTranslator: boolean) => {
    this.setState({ useTranslator });
  };

  render() {
    const { availableSites, currentSite, hasTranslator, onClose } = this.props;
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
            <FieldPanel
              instructions={translate(
                'Select the site the content should be copied from.'
              )}
              label={translate('Site')}
            >
              <Select
                onChange={this.handleSiteChange}
                options={siteOptions}
                value={site}
              />
            </FieldPanel>
            {site && currentSite && site.language !== currentSite.language ? (
              <FieldPanel
                instructions={translate(
                  hasTranslator
                    ? 'Uses a webservice to automatically translate texts.'
                    : 'A matching webservice must be configured in the options of this field in order to use this feature.'
                )}
                label={translate('Translate texts automatically')}
              >
                <Lightswitch
                  disabled={!hasTranslator}
                  onChange={this.handleToggleTranslator}
                  value={useTranslator}
                />
              </FieldPanel>
            ) : null}
          </FieldGroup>
        </Window.Content>
        <Window.Footer>
          <Button onClick={onClose} secondary>
            <Text value="Cancel" />
          </Button>
          <div className="spacer" />
          <Button onClick={this.handleApply} primary>
            <Text value="Apply" />
          </Button>
        </Window.Footer>
      </>
    );
  }
}

export default connect(
  (state: RootState) => {
    const {
      apiEndpoints,
      elementSiteId,
      hasTranslator,
      supportedSites,
    } = state.config;

    return {
      availableSites: supportedSites.filter(site => site.id !== elementSiteId),
      currentSite: supportedSites.find(site => site.id === elementSiteId),
      endpoint: apiEndpoints.translate,
      hasTranslator,
    };
  },
  dispatch => ({
    onSynchronize: (options: SynchronizeOptions) =>
      dispatch(synchronize(options)),
  })
)(Options);
