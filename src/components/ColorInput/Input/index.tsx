import * as React from 'react';

import InputBase from '../../Input';
import { withColorContext, InjectedColorProps } from '../ColorContext';
import { RgbColor, rgbToHex, hexToRgb } from '../Color';

export type InputType = 'hex' | 'red' | 'green' | 'blue' | 'alpha';

export type Props = InjectedColorProps & {
  type: InputType;
};

export type State = {
  hasFocus: boolean;
};

export class Input extends React.Component<Props, State> {
  state: State = {
    hasFocus: false,
  };

  getValue(): string {
    const { rgb, type } = this.props;
    switch (type) {
      case 'alpha':
      case 'blue':
      case 'green':
      case 'red':
        return `${rgb[type]}`;
      case 'hex':
        return rgbToHex(rgb);
    }
  }

  getColor(value: string): RgbColor {
    const { rgb, type } = this.props;
    switch (type) {
      case 'blue':
      case 'green':
      case 'red':
        const colorValue = parseInt(value);
        return {
          ...rgb,
          [type]: !isFinite(colorValue)
            ? rgb[type]
            : Math.max(0, Math.min(255, colorValue)),
        };

      case 'alpha':
        const alphaValue = parseFloat(value);
        return {
          ...rgb,
          alpha: !isFinite(alphaValue)
            ? rgb.alpha
            : Math.max(0, Math.min(1, alphaValue)),
        };

      case 'hex':
        const result = hexToRgb(value);
        return result ? { ...result, alpha: rgb.alpha } : rgb;
    }
  }

  handleBlur = () => {
    this.setState({ hasFocus: false });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { onRgbColor } = this.props;
    onRgbColor(this.getColor(value));
  };

  handleFocus = () => {
    this.setState({ hasFocus: true });
  };

  render() {
    const { hasFocus } = this.state;
    const props: React.InputHTMLAttributes<HTMLInputElement> = {
      className: 'tcfColorInputInput',
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
    };

    if (hasFocus) {
      props.defaultValue = this.getValue();
    } else {
      props.value = this.getValue();
    }

    return React.createElement(InputBase, props);
  }
}

export default withColorContext(Input);
