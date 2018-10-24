import * as React from 'react';

import uuid from '../../../store/utils/uuid';
import { RedactorField } from './index';
import { WidgetProps } from '../types';

export type Props = WidgetProps<RedactorField>;

export default class RedactorWidget extends React.Component<Props> {
  element: HTMLTextAreaElement | null = null;
  instance: Craft.RedactorInput | null = null;
  uuid: string = `element-${uuid()}`;

  handleChange = (value: string) => {
    this.props.onUpdate(value);
  };

  render() {
    const { data } = this.props;

    return (
      <div>
        <textarea
          defaultValue={typeof data === 'string' ? data : ''}
          id={this.uuid}
          ref={this.setElement}
        />
      </div>
    );
  }

  setElement = (element: HTMLTextAreaElement | null) => {
    if (this.element === element) return;
    this.element = element;

    let { instance } = this;
    if (instance) {
      if (instance.redactor) {
        instance.redactor.off('changed', this.handleChange);
      }

      instance.destroy();
      instance = null;
    }

    const { field } = this.props;

    if (element && field.redactor) {
      instance = new Craft.RedactorInput({
        ...field.redactor,
        id: this.uuid,
        redactorConfig: {
          ...field.redactor.redactorConfig,
        },
      });

      if (instance.redactor) {
        instance.redactor.on('changed', this.handleChange);
      }
    }

    this.instance = instance;
  };
}
