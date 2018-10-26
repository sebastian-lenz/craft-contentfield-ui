import * as React from 'react';
import { connect } from 'react-redux';

import Field from '../Field';
import FieldGroup, { toolbarGroup } from '../FieldGroup';
import FieldPanel from '../FieldPanel';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { Model, RootState, Schema } from '../../store/models';
import { updateValue } from '../../store/actions';

export interface ExternalProps {
  model: Model;
  path: Array<AnyPathSegment>;
}

export interface Props extends ExternalProps {
  onUpdate: (key: string, value: any) => void;
  schema?: Schema;
}

export interface Group {
  index: number;
  label: string;
  fields: Array<React.ReactNode>;
}

function getGroupSort(a: Group, b: Group) {
  return a.index - b.index;
}

export function InstanceForm({ model, onUpdate, path, schema }: Props) {
  if (!schema) {
    return <div>{`Could not resolve schema for "${model.__type}"`}</div>;
  }

  const groups: Array<Group> = [];
  let group: Group | undefined = undefined;

  for (const name of Object.keys(schema.fields)) {
    const field = schema.fields[name];
    if (!group || (field.group && group.label !== field.group)) {
      group = {
        index: field.group === toolbarGroup ? -1 : groups.length,
        label: field.group,
        fields: [],
      };

      groups.push(group);
    }

    group.fields.push(
      <FieldPanel key={field.name} label={field.label} width={field.width}>
        <Field
          data={model[field.name]}
          field={field}
          model={model}
          onUpdate={(value: any) => onUpdate(name, value)}
          path={path}
        />
      </FieldPanel>
    );
  }

  return (
    <>
      {groups.sort(getGroupSort).map(group => (
        <FieldGroup key={group.index} label={group.label}>
          {group.fields}
        </FieldGroup>
      ))}
    </>
  );
}

export default connect(
  (state: RootState, props: ExternalProps) => ({
    schema: state.schemas[props.model.__type],
  }),
  (dispatch, props) => ({
    onUpdate: (key: string, value: any) => {
      dispatch(updateValue(props.path, key, value));
    },
  })
)(InstanceForm);
