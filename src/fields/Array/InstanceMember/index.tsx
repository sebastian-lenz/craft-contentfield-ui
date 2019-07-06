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

export type Props = BaseProps<Model, InstanceField>;

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
      dragPreview,
      dragSource,
      field,
      hasDropTarget,
      isCollapsible,
      isCompact,
      isDragging,
      path,
      schema,
    } = this.props;

    let isBorderless = false;
    if (schema) {
      const fieldNames = Object.keys(schema.fields);
      if (
        fieldNames.length === 1 &&
        schema.fields[fieldNames[0]].type === 'redactor'
      ) {
        isBorderless = true;
      }
    }

    const isExpanded = this.context.isExpanded(child.__uuid);
    const isActualExpanded = !isCollapsible || isExpanded;
    let content: React.ReactNode;

    if (isActualExpanded) {
      content = (
        <div className="tcfArrayWidgetMember--body">
          <Instance
            canChangeType={false}
            isBorderless={isBorderless}
            model={child}
            path={path}
            schemaNames={field.schemas}
          />
        </div>
      );
    } else if (depth !== 2) {
      content = (
        <InstancePreview
          className="tcfArrayWidgetMember--preview"
          field={field}
          model={child}
          onClick={this.handleToggleExpanded}
        />
      );
    }

    return (
      <div
        className={cx(`tcfArrayWidgetMember depth-${depth}`, {
          hasDropTarget,
          isCompact,
          isDragging,
        })}
      >
        {dragPreview(
          <div
            className={cx('tcfArrayWidgetMember--panel', {
              isExpanded: isActualExpanded,
            })}
          >
            <Header
              dragSource={dragSource}
              isCollapsible={isCollapsible}
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
