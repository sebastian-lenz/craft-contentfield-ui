import * as React from 'react';
import { connect } from 'react-redux';

import Field from '../Field';
import FieldGroup, { toolbarGroup } from '../FieldGroup';
import FieldPanel from '../FieldPanel';
import fields from '../../fields';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { Model, RootState, Schema } from '../../store/models';
import { updateValue } from '../../store/actions';

import {
  Context,
  ResponsiveState,
} from '../../contexts/ResponsiveStateProvider';

import './index.styl';

export interface ExternalProps {
  disabled?: boolean;
  isBorderless?: boolean;
  model: Model;
  path: Array<AnyPathSegment>;
}

export interface Props extends ExternalProps {
  onUpdate: (key: string, value: any) => void;
  schema?: Schema;
}

export interface Group {
  index: number;
  label?: string;
  fields: Array<React.ReactNode>;
  style?: React.CSSProperties;
}

function getGroupSort(a: Group, b: Group) {
  return a.index - b.index;
}

export function InstanceForm({
  disabled = false,
  isBorderless,
  model,
  onUpdate,
  path,
  schema,
}: Props) {
  const responsiveState = React.useContext(Context);
  if (!schema) {
    return <div>{`Could not resolve schema for "${model.__type}"`}</div>;
  }

  const groups: Array<Group> = [];
  const useLayout = responsiveState == ResponsiveState.Large;
  let currentGroup: Group | undefined = undefined;

  for (const name of Object.keys(schema.fields)) {
    const field = schema.fields[name];
    const errors = model.__errors[name] || null;
    const { isAlwaysPlainField: isAlwaysCompact } = fields.getDefinition(field);

    if (!currentGroup || field.group) {
      const label = field.group ? field.group.label : undefined;
      const style = field.group && useLayout ? field.group.style : undefined;
      currentGroup = {
        index: label === toolbarGroup ? -1 : groups.length,
        label: label,
        fields: [],
        style,
      };

      groups.push(currentGroup);
    }

    currentGroup.fields.push(
      <FieldPanel
        errors={errors}
        instructions={field.instructions}
        isPlainField={isBorderless || isAlwaysCompact}
        isRequired={field.isRequired}
        key={field.name}
        label={field.label}
        width={useLayout ? field.width : undefined}
      >
        <Field
          data={model[field.name]}
          disabled={disabled}
          errors={errors}
          field={field}
          model={model}
          onUpdate={(value: any) => onUpdate(name, value)}
          path={path}
        />
      </FieldPanel>
    );
  }

  const children = groups.sort(getGroupSort).map(group => (
    <FieldGroup
      isBorderless={isBorderless}
      key={group.index}
      label={group.label}
      style={useLayout ? group.style : undefined}
    >
      {group.fields}
    </FieldGroup>
  ));

  const { grid } = schema;
  if (grid && useLayout) {
    return (
      <div className="tcfInstanceForm" style={{ grid }}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
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
