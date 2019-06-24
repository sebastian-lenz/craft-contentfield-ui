import * as React from 'react';
import cx from 'classnames';

import DetailsPanel from '../../../components/DetailsPanel';
import dragSource, { Props as BaseProps } from '../utils/dragSource';
import Header from './Header';
import Instance from '../../../components/Instance';
import InstancePreview from '../../../components/InstancePreview';
import { InstanceField } from '../../Instance';
import { Model } from '../../../store/models';

import './index.styl';

export type Props = BaseProps<Model, InstanceField>;

class InstanceMember extends React.Component<Props> {
  handleDelete = () => {
    const { index, onDelete } = this.props;
    onDelete(index);
  };

  handleToggleExpanded = () => {
    const { child, onToggleExpanded } = this.props;
    onToggleExpanded(child.__uuid);
  };

  handleUpdate = (value: any) => {
    const { index, onUpdate } = this.props;
    onUpdate(index, value);
  };

  render() {
    const {
      child,
      dragPreview,
      dragSource,
      field,
      hasDropTarget,
      isCollapsible,
      isCompact,
      isDragging,
      isExpanded,
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

    const isActualExpanded = !isCollapsible || isExpanded;
    let content: React.ReactNode;
    if (isActualExpanded) {
      content = (
        <Instance
          canChangeType={false}
          isBorderless={isBorderless}
          model={child}
          path={path}
          schemaNames={field.schemas}
        />
      );
    } else {
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
        className={cx('tcfArrayWidgetMember', {
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
            <DetailsPanel
              itemClassName="tcfArrayWidgetMember--body"
              uri={isExpanded ? 'details' : 'summary'}
            >
              {content}
            </DetailsPanel>
          </div>
        )}
      </div>
    );
  }
}

export default dragSource(InstanceMember);
