import * as React from 'react';
import cx from 'classnames';

import DetailsPanel from '../../../components/DetailsPanel';
import dragSource, { Props as BaseProps } from '../utils/dragSource';
import Header from './Header';
import Instance from '../../../components/Instance';
import InstancePreview from '../../../components/InstancePreview';
import { Context } from '../../../contexts/ExpandedStateProvider';
import { InstanceField } from '../../Instance';
import { Model } from '../../../store/models';

import './index.styl';
import { PreviewMode } from '..';

export type Props = BaseProps<Model, InstanceField>;

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

class InstanceMember extends React.Component<Props> {
  context!: React.ContextType<typeof Context>;
  static contextType = Context;

  handleDelete = () => {
    const { index, onDelete } = this.props;
    onDelete(index);
  };

  handleToggleExpanded = () => {
    const { toggleExpanded } = this.context;
    const { child } = this.props;
    toggleExpanded(child.__uuid);
  };

  handleUpdate = (value: any) => {
    const { index, onUpdate } = this.props;
    onUpdate(index, value);
  };

  render() {
    const {
      child,
      depth,
      disabled,
      dragPreview,
      dragSource,
      field,
      hasDropTarget,
      isCollapsible,
      isDragging,
      path,
      previewMode,
      schema,
    } = this.props;

    let canExpand = true;
    let isBorderless = false;
    if (schema) {
      const fieldNames = Object.keys(schema.fields);
      canExpand = fieldNames.length > 0;
      isBorderless =
        fieldNames.length === 1 &&
        schema.fields[fieldNames[0]].type === 'redactor';
    }

    const isExpanded = this.context.isExpanded(child.__uuid);
    const isActualExpanded = canExpand && (!isCollapsible || isExpanded);
    const hasPreview =
      schema && schema.preview && usePreview(previewMode, depth);

    let content: React.ReactNode;

    if (isActualExpanded) {
      content = (
        <div className="tcfArrayWidgetMember--body">
          <Instance
            canChangeType={false}
            disabled={disabled}
            isBorderless={isBorderless}
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
          model={child}
          onClick={canExpand ? this.handleToggleExpanded : undefined}
        />
      );
    }

    return (
      <div
        className={cx(
          `tcfArrayWidgetMember depth-${depth}`,
          isActualExpanded ? 'isExpanded' : 'isCollapsed',
          { hasDropTarget, isDragging }
        )}
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
              onDelete={this.handleDelete}
              onToggleExpanded={this.handleToggleExpanded}
              schema={schema}
            />
            <DetailsPanel uri={isExpanded ? 'details' : 'summary'}>
              {content}
            </DetailsPanel>
          </div>
        )}
      </div>
    );
  }
}

export default dragSource(InstanceMember);
