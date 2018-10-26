import * as React from 'react';

import ColorContext from './ColorContext';
import Flyout from '../Flyout';
import Input from './Input';
import Picker from './Picker';
import Swatch from './Swatch';
import { RgbColor } from './Color';

import './index.styl';

export interface Props {
  color: RgbColor;
  disableAlpha?: boolean;
  onChange: (color: RgbColor) => void;
  presetColors?: Array<string> | null;
}

export type State = {
  hasColorPicker: boolean;
};

export default class ColorInput extends React.Component<Props, State> {
  state: State = {
    hasColorPicker: false,
  };

  handleChange = (color: RgbColor) => {
    this.props.onChange(color);
  };

  handleSwatchClick = () => {
    this.setState({ hasColorPicker: true });
  };

  handleOverlayClick = () => {
    this.setState({ hasColorPicker: false });
  };

  render() {
    const { hasColorPicker } = this.state;
    const { color, disableAlpha, onChange, presetColors } = this.props;

    return (
      <ColorContext color={color} onChange={onChange}>
        <div className="tcfColorInput">
          <Swatch
            className="tcfColorInput--swatch"
            onClick={this.handleSwatchClick}
          >
            {hasColorPicker ? (
              <Flyout onClick={this.handleOverlayClick}>
                <Picker
                  disableAlpha={disableAlpha}
                  presetColors={presetColors}
                />
              </Flyout>
            ) : null}
          </Swatch>
          <Input type="hex" />
        </div>
      </ColorContext>
    );
  }
}
