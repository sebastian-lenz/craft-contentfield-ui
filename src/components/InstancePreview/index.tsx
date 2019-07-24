import * as React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';

import fields from '../../fields';
import toHTML from '../../utils/toHTML';
import { InstanceField } from '../../fields/Instance';
import { Reference, Schemas, Model, RootState } from '../../store/models';

import './index.styl';

export interface ExternalProps {
  className?: string;
  field: InstanceField;
  model: Model;
  onClick?: () => void;
}

export interface Props extends ExternalProps {
  i18nCategory: string;
  references: Array<Reference>;
  schemas: Schemas;
}

export class InstancePreview extends React.Component<Props> {
  render() {
    const {
      className,
      field,
      i18nCategory,
      model,
      onClick,
      references,
      schemas,
    } = this.props;

    const definition = fields.getDefinition('instance');
    const preview = definition.preview({
      context: {
        depth: 0,
        i18nCategory,
        references,
        schemas,
      },
      field,
      value: model,
    });

    try {
      const innerHTML = {
        __html: toHTML(preview),
      };

      return (
        <div
          className={cx('tcfInstancePreview', className, {
            isClickable: !!onClick,
          })}
          onClick={onClick}
        >
          <div
            className="tcfInstancePreview--content"
            dangerouslySetInnerHTML={innerHTML}
          />
        </div>
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

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.model !== this.props.model;
  }
}

export default connect((state: RootState) => ({
  i18nCategory: state.config.i18nCategory,
  references: state.config.references,
  schemas: state.schemas,
}))(InstancePreview);
