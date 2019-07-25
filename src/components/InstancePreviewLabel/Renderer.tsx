import * as React from 'react';

import fields from '../../fields';
import toHTML from '../../utils/toHTML';
import { InstanceField } from '../../fields/Instance';
import { Model, Reference, Schemas } from '../../store/models';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  field: InstanceField;
  model: Model;
  references: Reference[];
  schemas: Schemas;
}

export default React.memo(
  function Renderer({ field, model, references, schemas, ...props }: Props) {
    const definition = fields.getDefinition('instance');
    const preview = definition.preview({
      context: {
        depth: 0,
        references,
        schemas,
      },
      field,
      mode: 'label',
      value: model,
    });

    const content = toHTML(preview)
      .replace(/<[^>]*>?/gm, '')
      .replace(/[\n\t\r]+/g, '')
      .trim()
      .substr(0, 256);

    return <div {...props}>{content}</div>;
  },
  function areEqual(prevProps: Props, nextProps: Props) {
    return prevProps.model === nextProps.model;
  }
);
