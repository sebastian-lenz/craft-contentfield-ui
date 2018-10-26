import * as React from 'react';

import { RgbColor, HsvColor, rgbToHsv, hsvToRgb, rgbToCss } from './Color';

const Context = React.createContext<InjectedColorProps>({
  css: '#000',
  hsv: {
    hue: 0,
    saturation: 0,
    value: 0,
    alpha: 0,
  },
  rgb: {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
  },
  onHsvColor: (hsv: HsvColor) => {},
  onRgbColor: (rgb: RgbColor) => {},
});

export interface Props {
  children?: React.ReactNode;
  color: RgbColor;
  onChange: (color: RgbColor) => void;
}

export interface State {
  css: string;
  hsv: HsvColor;
  rgb: RgbColor;
}

export interface InjectedColorProps {
  css: string;
  hsv: HsvColor;
  rgb: RgbColor;
  onHsvColor: (hsv: HsvColor) => void;
  onRgbColor: (rgb: RgbColor) => void;
}

export function withColorContext<Props = {}>(
  Component: React.ComponentType<Props & InjectedColorProps>
): React.ComponentType<Props> {
  return function WithColorContext(props: Props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} {...context} />}
      </Context.Consumer>
    );
  };
}

export default class ColorContext extends React.Component<Props, State> {
  timeout: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      css: rgbToCss(props.color),
      hsv: rgbToHsv(props.color),
      rgb: { ...props.color },
    };
  }

  commit = () => {
    if (this.timeout !== null) {
      window.clearTimeout(this.timeout);
    }

    this.timeout = window.setTimeout(this.handleTimeout, 250);
  };

  handleHsvColor = (hsv: HsvColor) => {
    const rgb = hsvToRgb(hsv);
    this.setState({
      css: rgbToCss(rgb),
      rgb,
      hsv,
    });

    this.commit();
  };

  handleRgbColor = (rgb: RgbColor) => {
    this.setState({
      css: rgbToCss(rgb),
      rgb,
      hsv: rgbToHsv(rgb),
    });

    this.commit();
  };

  handleTimeout = () => {
    this.timeout = null;
    this.props.onChange(this.state.rgb);
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider
        value={{
          ...this.state,
          onHsvColor: this.handleHsvColor,
          onRgbColor: this.handleRgbColor,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}
