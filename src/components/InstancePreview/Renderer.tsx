import * as React from 'react';
import cx from 'classnames';

import fields from '../../fields';
import toHTML from '../../utils/toHTML';
import { InstanceField } from '../../fields/Instance';
import { Model, Reference, Schemas } from '../../store/models';
import { PreviewMode } from '../../fields/FieldDefinition';

import './index.styl';

export interface Props {
  field: InstanceField;
  model: Model;
  mode?: PreviewMode;
  references: Reference[];
  schemas: Schemas;
}

export default React.memo(
  function Renderer({
    field,
    model,
    mode = 'default',
    references,
    schemas,
  }: Props) {
    const definition = fields.getDefinition('instance');
    const preview = definition.preview({
      context: {
        depth: 0,
        references,
        schemas,
      },
      field,
      mode,
      value: model,
    });

    try {
      const innerHTML = {
        __html: toHTML(preview),
      };

      return (
        <div
          className={cx('tcfInstancePreview--content', mode)}
          dangerouslySetInnerHTML={innerHTML}
        />
      );
    } catch (error) {
      return (
        <>
          <p>
            <span className="tcfIcon material">error</span>
            <span>Could not render preview.</span>
          </p>
          {error && typeof error === 'object' && 'message' in error ? (
            <pre>{error.message}</pre>
          ) : null}
        </>
      );
    }
  },
  function areEqual(prevProps: Props, nextProps: Props) {
    return prevProps.model === nextProps.model;
  }
);
