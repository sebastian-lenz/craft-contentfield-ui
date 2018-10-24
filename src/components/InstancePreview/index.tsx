import * as React from 'react';
import { connect } from 'react-redux';

import preview from '../Field/Instance/preview';
import { Reference, Schemas, Model, RootState } from '../../store/models';

import './index.styl';

export interface PreviewContext {
  i18nCategory: string;
  references: Array<Reference>;
  schemas: Schemas;
}

export type Renderable<T = { [name: string]: any }> = T & {
  toHTML: () => string;
};

export interface ExternalProps {
  className?: string;
  model: Model;
  onClick?: () => void;
}

export interface Props extends ExternalProps {
  i18nCategory: string;
  references: Array<Reference>;
  schemas: Schemas;
}

export class InstancePreview extends React.PureComponent<Props> {
  render() {
    const {
      className,
      i18nCategory,
      model,
      references,
      schemas,
      onClick,
    } = this.props;

    try {
      const innerHTML = {
        __html: preview(model, undefined, {
          i18nCategory,
          references,
          schemas,
        }),
      };

      return (
        <div
          className={className}
          dangerouslySetInnerHTML={innerHTML}
          onClick={onClick}
        />
      );
    } catch (error) {
      return (
        <div className={className}>
          <p>
            <span className="tcfIcon material">error</span>
            <span>Could not render preview.</span>
          </p>
          {error && typeof error === 'object' && 'message' in error ? (
            <pre>{error.message}</pre>
          ) : null}
        </div>
      );
    }
  }
}

export default connect((state: RootState) => ({
  i18nCategory: state.config.i18nCategory,
  references: state.config.references,
  schemas: state.schemas,
}))(InstancePreview);
