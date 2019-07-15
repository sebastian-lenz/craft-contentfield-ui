import * as React from 'react';

import uuid from '../../store/utils/uuid';
import { Props } from './index';

import './Input.styl';

export default class Input extends React.Component<Props> {
  element: HTMLTextAreaElement | null = null;
  hasFocus: boolean = false;
  instance: Craft.RedactorInput | null = null;
  renderedValue: string = '';
  uuid: string = `element-${uuid()}`;

  componentDidUpdate() {
    const { hasFocus, instance, props, renderedValue } = this;
    if (instance && !hasFocus && props.value != renderedValue) {
      this.renderedValue = props.value;
      instance.redactor.source.setCode(props.value);
    }
  }

  handleBlur = () => {
    this.hasFocus = false;
  };

  handleChange = (value: string, ...args: any) => {
    if (!this.hasFocus) {
      return;
    }

    this.renderedValue = value;
    this.props.onUpdate(value);
  };

  handleFocus = () => {
    this.hasFocus = true;
  };

  render() {
    const { value } = this.props;

    return (
      <div className="tcfRedactorWidget">
        <textarea
          defaultValue={typeof value === 'string' ? value : ''}
          disabled
          id={this.uuid}
          ref={this.setElement}
        />
      </div>
    );
  }

  setElement = (element: HTMLTextAreaElement | null) => {
    if (this.element === element) return;
    this.element = element;

    const { elementSiteId, options } = this.props;
    let { instance } = this;

    if (instance) {
      if (instance.redactor) {
        instance.redactor.off('blur', this.handleBlur);
        instance.redactor.off('changed', this.handleChange);
        instance.redactor.off('focus', this.handleFocus);
      }

      instance.destroy();
      instance = null;
    }

    if (element) {
      instance = new Craft.RedactorInput({
        ...options,
        elementSiteId: elementSiteId,
        id: this.uuid,
        redactorConfig: {
          ...options.redactorConfig,
        },
      });

      if (instance.redactor) {
        instance.redactor.on('blur', this.handleBlur);
        instance.redactor.on('changed', this.handleChange);
        instance.redactor.on('focus', this.handleFocus);
      }
    }

    this.instance = instance;
  };
}
