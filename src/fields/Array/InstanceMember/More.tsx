import * as React from 'react';

import Icon from '../../../components/Icon';
import MoreMenu from './MoreMenu';

import './More.styl';
import Flyout from '../../../components/Flyout';

export interface Props {
  uuid: string;
}

export interface State {
  isExpanded: boolean;
}

export default class More extends React.Component<Props, State> {
  state: State = {
    isExpanded: false,
  };

  handleClose = () => {
    this.setState({ isExpanded: false });
  };

  handleMouseDown = () => {
    this.setState({ isExpanded: true });
  };

  render() {
    const { uuid } = this.props;
    const { isExpanded } = this.state;

    return (
      <div className="tcfArrayWidgetMember--headerMore">
        <div
          className="tcfArrayWidgetMember--headerMoreButton"
          onMouseDown={this.handleMouseDown}
        >
          <Icon name="material:more_vert" />
        </div>
        {isExpanded ? (
          <Flyout onClick={this.handleClose}>
            <MoreMenu onClose={this.handleClose} uuid={uuid} />
          </Flyout>
        ) : null}
      </div>
    );
  }
}
