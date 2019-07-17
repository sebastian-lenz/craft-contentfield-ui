import * as React from 'react';

import { Model, Schema, RootState } from '../../store/models';
import { InstanceField } from '../../fields/Instance';
import fields from '../../fields';
import { useSelector } from 'react-redux';
import toHTML from '../../utils/toHTML';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  field: InstanceField;
  model: Model;
}

export default function InstancePreviewLabel({
  field,
  model,
  ...props
}: Props) {
  const i18nCategory = useSelector(
    (state: RootState) => state.config.i18nCategory
  );
  const references = useSelector((state: RootState) => state.config.references);
  const schemas = useSelector((state: RootState) => state.schemas);

  const definition = fields.getDefinition('instance');
  const preview = definition.preview({
    context: {
      depth: 0,
      i18nCategory,
      references,
      schemas,
    },
    field,
    mode: 'label',
    value: model,
  });

  const content = toHTML(preview)
    .replace(/<[^>]*>?/gm, '')
    .substr(0, 256);

  return <div {...props}>{content}</div>;
}
