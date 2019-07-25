import * as React from 'react';
import cx from 'classnames';

import DetailsPanel from '../../../components/DetailsPanel';
import Header from './Header';
import Instance from '../../../components/Instance';
import InstancePreview from '../../../components/InstancePreview';
import useDrag from '../utils/useDrag';
import useDrop from '../utils/useDrop';
import { Context } from '../../../contexts/ExpandedStateProvider';
import { InstanceField } from '../../Instance';
import { ItemProps } from '../List';
import { Schema } from '../../../store/models';
import { PreviewMode } from '../index';

import './index.styl';

export interface Props extends ItemProps {
  field: InstanceField;
  isCollapsible: boolean;
  previewMode: PreviewMode;
  schema: Schema;
}

function usePreview(mode: PreviewMode, depth: number) {
  switch (mode) {
    case 'always':
      return true;
    case 'root':
      return depth === 1;
    default:
      false;
  }
}

export default function InstanceMember(props: Props) {
  const { isExpanded, toggleExpanded } = React.useContext(Context);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, dragSource, dragPreview] = useDrag(props, ref);
  const [, drop] = useDrop(props, ref);
  drop(ref);

  const {
    child,
    depth,
    disabled,
    field,
    isCollapsible,
    path,
    previewMode,
    schema,
  } = props;

  const handleToggleExpanded = () => {
    toggleExpanded(child.__uuid);
  };

  let canExpand = true;
  let isBorderless = false;
  if (schema) {
    const fieldNames = Object.keys(schema.fields);
    canExpand = fieldNames.length > 0;
    isBorderless =
      fieldNames.length === 1 &&
      schema.fields[fieldNames[0]].type === 'redactor';
  }

  const hasPreview = schema && schema.preview && usePreview(previewMode, depth);
  const isActualExpanded =
    canExpand && (!isCollapsible || isExpanded(child.__uuid));

  let content: React.ReactNode;

  if (isActualExpanded) {
    content = (
      <div className="tcfArrayWidgetMember--body">
        <Instance
          canChangeType={false}
          disabled={disabled}
          isBorderless={isBorderless}
          key="details"
          model={child}
          path={path}
          schemaNames={field.schemas}
        />
      </div>
    );
  } else if (hasPreview) {
    content = (
      <InstancePreview
        className="tcfArrayWidgetMember--preview"
        field={field}
        key="summary"
        model={child}
        onClick={canExpand ? handleToggleExpanded : undefined}
      />
    );
  }

  return (
    <div
      className={cx(
        `tcfArrayWidgetMember depth-${depth}`,
        isActualExpanded ? 'isExpanded' : 'isCollapsed',
        { isDragging }
      )}
      ref={ref}
    >
      {dragPreview(
        <div className="tcfArrayWidgetMember--panel">
          <Header
            disabled={disabled}
            dragSource={dragSource}
            field={field}
            hasPreview={!isActualExpanded && !hasPreview}
            isCollapsible={canExpand && isCollapsible}
            isExpanded={isActualExpanded}
            model={child}
            onToggleExpanded={handleToggleExpanded}
            schema={schema}
          />
          <DetailsPanel uri={isActualExpanded ? 'details' : 'summary'}>
            {content}
          </DetailsPanel>
        </div>
      )}
    </div>
  );
}
