import * as React from 'react';

import uuid from '../../store/utils/uuid';
import { Props } from './index';

import './Input.styl';

export default class Input extends React.Component<Props> {
  didRender: boolean = false;
  element: HTMLTextAreaElement | null = null;
  instance: Craft.RedactorInput | null = null;
  renderedValue: string = '';
  uuid: string = `element-${uuid()}`;

  componentDidUpdate() {
    const { instance, props, renderedValue } = this;
    if (instance && props.value != renderedValue) {
      this.didRender = true;
      this.renderedValue = props.value;
      instance.redactor.source.setCode(props.value);
    }
  }

  handleChange = (value: string) => {
    if (this.didRender) {
      this.didRender = false;
      return;
    }

    this.renderedValue = value;
    this.props.onUpdate(value);
  };

  render() {
    const { value } = this.props;

    return (
      <div className="tcfRedactorWidget">
        <textarea
          defaultValue={typeof value === 'string' ? value : ''}
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
        instance.redactor.off('changed', this.handleChange);
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
        instance.redactor.on('changed', this.handleChange);
      }
    }

    this.instance = instance;
  };
}
