import * as React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';

import Button from '../../../Button';
import dragSource, { Props } from './dragSource';
import Icon from '../../../Icon';
import InstancePreview from '../../../InstancePreview';
import Widget from '../../index';
import { RootState, Schema } from '../../../../store/models';
import { toggleExpanded } from '../../../../store/actions';
import isModel from '../../../../store/utils/isModel';
import DetailsPanel from '../../../DetailsPanel';
import Text from '../../../Text';
import Instance from '../../../Instance';

export type ReceivedProps = Props & {
  isExpanded: boolean;
  onToggleExpanded: () => void;
  schema: Schema | null;
};

class Member extends React.Component<ReceivedProps> {
  handleDelete = () => {
    const { index, onDelete } = this.props;
    onDelete(index);
  };

  handleUpdate = (value: any) => {
    const { index, onUpdate } = this.props;
    onUpdate(index, value);
  };

  render() {
    const {
      child,
      dragPreview,
      field,
      hasDropTarget,
      isDragging,
      isExpanded,
      model,
      onToggleExpanded,
      path,
    } = this.props;

    if (field.type !== 'instance') {
      return null;
    }

    return (
      <div
        className={cx('tcfArrayWidgetMember', { hasDropTarget, isDragging })}
      >
        {dragPreview(
          <div className="tcfArrayWidgetMember--panel">
            {this.renderHeader()}
            <DetailsPanel
              className="tcfArrayWidgetMember--body"
              uri={isExpanded ? 'details' : 'summary'}
            >
              {isExpanded ? (
                <Instance
                  className="tcfArrayWidgetMember--widget"
                  model={child}
                  path={path}
                  schemaNames={field.schemas}
                />
              ) : (
                <InstancePreview
                  className="tcfArrayWidgetMember--preview"
                  model={child}
                  onClick={onToggleExpanded}
                />
              )}
            </DetailsPanel>
          </div>
        )}
      </div>
    );
  }

  renderHeader() {
    const { dragSource, isExpanded, onToggleExpanded, schema } = this.props;

    const handleItems = [
      <Icon
        className="tcfArrayWidgetMember--headerHandleIcon"
        key="handle"
        name="move"
      />,
    ];

    if (schema) {
      handleItems.push(<Icon key="schemaIcon" name={schema.icon} />);
      handleItems.push(<Text key="schemaLabel" value={schema.label} />);
    }

    return (
      <div className="tcfArrayWidgetMember--header">
        {dragSource(
          <div className="tcfArrayWidgetMember--headerHandle">
            {handleItems}
          </div>
        )}
        <div className="tcfArrayWidgetMember--headerActions">
          <Button onClick={onToggleExpanded}>
            <Icon name={isExpanded ? 'done' : 'edit'} />
            <Text value={isExpanded ? 'Apply' : 'Edit'} />
          </Button>
          <Button onClick={this.handleDelete}>
            <Icon name="remove" />
            <Text value="Delete" />
          </Button>
        </div>
      </div>
    );
  }
}

const connection = connect(
  (state: RootState, props: Props) => {
    const model = isModel(props.child) ? props.child : null;
    return {
      isExpanded: model
        ? state.config.expanded.indexOf(model.__uuid) !== -1
        : false,
      schema: model ? state.schemas[model.__type] : null,
    };
  },
  (dispatch, props) => {
    const model = isModel(props.child) ? props.child : null;
    return {
      onToggleExpanded: () =>
        model ? dispatch(toggleExpanded(model.__uuid)) : null,
    };
  }
);

export default dragSource(connection(Member));
