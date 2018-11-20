import * as React from 'react';
import cx from 'classnames';

import Flyout from '../../components/Flyout';
import { EnumKey, EnumOption } from '../EnumFieldDefinition';
import { SwatchColorField } from './index';
import { WidgetProps } from '../FieldDefinition';

import './SwatchColorWidget.styl';

export type Props = WidgetProps<SwatchColorField>;

export type State = {
  isExpanded: boolean;
};

function getColor(option?: EnumOption): string {
  let color: any;
  if (option) {
    color = 'color' in option ? option.color : option.label;
  }

  return typeof color === 'string' ? color : 'transparent';
}

export default class SwatchColorWidget extends React.Component<Props, State> {
  state: State = {
    isExpanded: false,
  };

  handleFlyoutClick = () => {
    this.setState({ isExpanded: false });
  };

  handleSelect = (option: EnumOption) => {
    this.props.onUpdate(option.key);
    this.setState({ isExpanded: false });
  };

  handleSwatchClick = (event: React.SyntheticEvent) => {
    if (event.currentTarget === event.target) {
      this.setState({ isExpanded: true });
    }
  };

  render() {
    const { data, field } = this.props;
    const { isExpanded } = this.state;
    const selected = field.options.find(option => option.key === data);

    return (
      <div
        className={cx('tcfSwatchColorWidget', { isUndecided: !selected })}
        onClick={this.handleSwatchClick}
        style={{ background: selected ? getColor(selected) : undefined }}
      >
        {isExpanded ? this.renderFlyout(selected) : null}
      </div>
    );
  }

  renderFlyout(selected?: EnumOption) {
    const { field } = this.props;

    return (
      <Flyout onClick={this.handleFlyoutClick}>
        <div className="tcfSwatchColorWidget--swatches">
          {field.options.map(option => (
            <div
              className={cx('tcfSwatchColorWidget--swatch', {
                isSelected: option === selected,
              })}
              key={option.key}
              onClick={() => this.handleSelect(option)}
              style={{ background: getColor(option) }}
            />
          ))}
        </div>
      </Flyout>
    );
  }
}
