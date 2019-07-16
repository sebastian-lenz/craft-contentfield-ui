import * as React from 'react';
import cx from 'classnames';

export interface Props {
  className?: string;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  small?: boolean;
  value: boolean;
}

export default class Lightswitch extends React.Component<Props> {
  element: HTMLElement | null = null;
  lightswitch: Craft.LightSwitch | null = null;

  componentDidUpdate(oldProps: Props) {
    const { value } = this.props;
    const { lightswitch } = this;

    if (oldProps.disabled !== this.props.disabled) {
      this.updateInstance();
    } else if (lightswitch && lightswitch.on !== value) {
      lightswitch.toggle();
    }
  }

  handleChange = () => {
    const { disabled, onChange } = this.props;
    const { lightswitch } = this;

    if (!disabled && lightswitch) {
      onChange(lightswitch.on);
    }
  };

  render() {
    const { className, disabled, small, value } = this.props;
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

    this.updateInstance();
  };

  updateInstance() {
    const { element, handleChange, lightswitch } = this;
    const { disabled, value } = this.props;

    if (lightswitch) {
      lightswitch.destroy();
      this.lightswitch = null;
    }

    if (!disabled && element) {
      this.lightswitch = new Craft.LightSwitch(element, {
        onChange: handleChange,
        value: value,
      });
    }
  }
}
