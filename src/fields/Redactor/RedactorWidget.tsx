import * as React from 'react';
import { connect } from 'react-redux';

import uuid from '../../store/utils/uuid';
import { RedactorField } from './index';
import { RootState } from '../../store/models';
import { WidgetProps } from '../FieldDefinition';

import './RedactorWidget.styl';

export type ExternalProps = WidgetProps<RedactorField>;

export interface Props extends ExternalProps {
  elementSiteId: number | null;
}

export class RedactorWidget extends React.Component<Props> {
  didRender: boolean = false;
  element: HTMLTextAreaElement | null = null;
  instance: Craft.RedactorInput | null = null;
  renderedValue: string = '';
  uuid: string = `element-${uuid()}`;

  componentDidUpdate() {
    const { instance, props, renderedValue } = this;
    if (instance && props.data != renderedValue) {
      this.didRender = true;
      this.renderedValue = props.data;
      instance.redactor.source.setCode(props.data);
    }
  }

  handleChange = (value: string, ...args: any) => {
    if (this.didRender) {
      this.didRender = false;
      return;
    }

    this.renderedValue = value;
    this.props.onUpdate(value);
  };

  render() {
    const { data } = this.props;

    return (
      <div className="tcfRedactorWidget">
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

    const { elementSiteId, field } = this.props;

    if (element && field.redactor) {
      instance = new Craft.RedactorInput({
        ...field.redactor,
        elementSiteId: elementSiteId,
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

export default connect((state: RootState) => ({
  elementSiteId: state.config.elementSiteId,
}))(RedactorWidget);
