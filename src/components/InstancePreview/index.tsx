import * as React from 'react';
import { connect } from 'react-redux';

import fields from '../../fields';
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

export class InstancePreview extends React.PureComponent<Props> {
  render() {
    const {
      className,
      field,
      i18nCategory,
      model,
      references,
      schemas,
      onClick,
    } = this.props;

    const definition = fields.getDefinition('instance');
    const preview = definition.preview({
      context: {
        i18nCategory,
        references,
        schemas,
      },
      field,
      value: model,
    });

    try {
      const innerHTML = {
        __html: typeof preview === 'object' ? preview.toHTML() : preview,
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
