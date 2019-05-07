import * as React from 'react';
import cx from 'classnames';

export interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  small?: boolean;
  value: boolean;
}

export default class Lightswitch extends React.Component<Props> {
  element: HTMLElement | null = null;
  lightswitch: Craft.LightSwitch | null = null;

  componentDidUpdate() {
    const { value } = this.props;
    const { lightswitch } = this;

    if (lightswitch && lightswitch.on !== value) {
      lightswitch.toggle();
    }
  }

  handleChange = () => {
    const { onChange } = this.props;
    const { lightswitch } = this;

    if (lightswitch) {
      onChange(lightswitch.on);
    }
  };

  render() {
    const { children, className, disabled, small, value } = this.props;
    return (
      <div>
        <div
          className={cx('lightswitch', className, {
            disabled,
            on: value,
            small,
          })}
          ref={this.setElement}
          tabIndex={0}
        >
          <div className="lightswitch-container">
            <div className="label on" />
            <div className="handle" />
            <div className="label off" />
          </div>
        </div>
      </div>
    );
  }

  setElement = (element: HTMLElement | null) => {
    if (this.element === element) return;
    this.element = element;

    if (this.lightswitch) {
      this.lightswitch.destroy();
      this.lightswitch = null;
    }

    if (element) {
      this.lightswitch = new Craft.LightSwitch(element, {
        onChange: this.handleChange,
        value: this.props.value,
      });
    }
  };
}
