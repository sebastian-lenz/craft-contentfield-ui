import * as React from 'react';
import { connect } from 'react-redux';

import debounce from '../../utils/debounce';
import ErrorMessage from '../../components/ErrorMessage';
import { isOEmbed, OEmbed } from './OEmbed';
import { OEmbedField } from './index';
import { RootState } from '../../store/models';
import { WidgetProps } from '../FieldDefinition';

import './OEmbedWidget.styl';
import { createUrl } from '../../store/utils/createUrl';

export type Props = WidgetProps<OEmbedField> & {
  apiEndpoint: string;
};

export type State = {
  mode: 'idle' | 'typing' | 'loading';
};

export class OEmbedWidget extends React.Component<Props, State> {
  request: XMLHttpRequest | null = null;
  state: State = {
    mode: 'idle',
  };

  getOEmbed(): OEmbed {
    const { data } = this.props;
    return isOEmbed(data) ? data : { url: '' };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.updateOEmbed();
    this.setState({ mode: 'typing' });
    this.props.onUpdate({
      ...this.getOEmbed(),
      url: event.target.value,
    });
  };

  handleRequestStateChange(request: XMLHttpRequest) {
    if (request.readyState !== XMLHttpRequest.DONE) return;
    if (request.status !== 200) {
      return this.handleRequestError();
    }

    let result: any;
    try {
      result = JSON.parse(request.responseText);
    } catch (error) {
      return this.handleRequestError();
    }

    this.setState({ mode: 'idle' });
    this.request = null;
    this.props.onUpdate({
      ...this.getOEmbed(),
      info: result.data,
    });
  }

  handleRequestError() {
    this.setState({ mode: 'idle' });
    this.request = null;
    this.props.onUpdate({
      ...this.getOEmbed(),
      info: null,
    });
  }

  render() {
    const oembed = this.getOEmbed();
    const { disabled } = this.props;
    const { mode } = this.state;
    let info: React.ReactNode;

    if (mode === 'typing' || mode === 'loading') {
      info = (
        <div className="tcfOEmbedWidget--activity">
          <div className="tcfOEmbedWidget--activityBounce first" />
          <div className="tcfOEmbedWidget--activityBounce second" />
          <div className="tcfOEmbedWidget--activityBounce third" />
        </div>
      );
    } else if (oembed.info) {
      const { title, author_name, thumbnail_url } = oembed.info;

      info = (
        <div className="tcfOEmbedWidget--info">
          {thumbnail_url ? (
            <div className="tcfOEmbedWidget--infoImagePanel">
              <img className="tcfOEmbedWidget--infoImage" src={thumbnail_url} />
            </div>
          ) : null}
          <div className="tcfOEmbedWidget--infoContent">
            <div className="tcfOEmbedWidget--infoTitle">{title}</div>
            <div className="tcfOEmbedWidget--infoAuthor">{author_name}</div>
          </div>
        </div>
      );
    } else if (oembed.url) {
      info = <ErrorMessage title="Invalid embed url" />;
    }

    return (
      <div className="tcfOEmbedWidget">
        <div className="tcfOEmbedWidget--input">
          <input
            autoComplete="off"
            className="text fullwidth"
            disabled={disabled}
            onChange={disabled ? undefined : this.handleChange}
            value={oembed.url}
          />
        </div>
        {info}
      </div>
    );
  }

  updateOEmbed = debounce(() => {
    this.setState({ mode: 'loading' });

    const { apiEndpoint, model, field } = this.props;
    const params = {
      schema: model.__type,
      field: field.name,
      url: this.getOEmbed().url,
    };

    const request = new XMLHttpRequest();
    request.onreadystatechange = () => this.handleRequestStateChange(request);
    request.onerror = () => this.handleRequestError();
    request.open('GET', createUrl(apiEndpoint, params));
    request.send();

    if (this.request) this.request.abort();
    this.request = request;
  }, 500);
}

export default connect((state: RootState) => ({
  apiEndpoint: state.config.apiEndpoints.oembed,
}))(OEmbedWidget);
