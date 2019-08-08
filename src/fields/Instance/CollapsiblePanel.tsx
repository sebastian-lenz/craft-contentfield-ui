import * as React from 'react';
import { useSelector } from 'react-redux';

import DetailsPanel from '../../components/DetailsPanel';
import Header from '../Array/InstanceMember/Header';
import InstancePreview from '../../components/InstancePreview';
import { Context as ExpandedContext } from '../../contexts/ExpandedStateProvider';
import { Context as DepthContext } from '../../contexts/InstanceDepthProvider';
import { RootState, Model } from '../../store/models';
import { InstanceField } from '.';

export interface Props {
  children: React.ReactChild;
  model: Model;
  disabled?: boolean;
  field: InstanceField;
}

export default function CollapsiblePanel({
  children,
  disabled,
  field,
  model,
}: Props) {
  const depth = React.useContext(DepthContext);
  const schemas = useSelector((state: RootState) => state.schemas);
  const { isExpanded, toggleExpanded } = React.useContext(ExpandedContext);

  const schema = schemas[model.__type];
  const isActualExpanded = isExpanded(model.__uuid);
  const hasPreview = schema && schema.preview;
  const handleToggle = () => toggleExpanded(model.__uuid);

  let content = null;
  if (isActualExpanded) {
    content = <div className="tcfArrayWidgetMember--body">{children}</div>;
  } else if (hasPreview) {
    content = <InstancePreview field={field} model={model} />;
  }

  return (
    <div className={`tcfInstanceWidget--collapsiblePanel depth-${depth}`}>
      <Header
        disabled={disabled}
        field={field}
        hasPreview={!isActualExpanded && !hasPreview}
        isCollapsible
        isExpanded={isActualExpanded}
        model={model}
        onToggleExpanded={handleToggle}
        schema={schema}
      />
      <DetailsPanel uri={isActualExpanded ? 'details' : 'summary'}>
        {content}
      </DetailsPanel>
    </div>
  );
}
