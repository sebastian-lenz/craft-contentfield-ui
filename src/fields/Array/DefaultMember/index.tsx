import * as React from 'react';
import cx from 'classnames';

import Button from '../../../components/Button';
import dragSource, { Props as BaseProps } from '../utils/dragSource';
import Field from '../../../components/Field';
import Icon from '../../../components/Icon';
import Text from '../../../components/Text';
import { AnyField } from '../../index';

export type Props = BaseProps<any, AnyField>;

class DefaultMember extends React.Component<Props> {
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
      dragSource,
      field,
      hasDropTarget,
      index,
      isDragging,
      model,
      path,
    } = this.props;

    return (
      <div
        className={cx('tcfArrayWidgetMember', { hasDropTarget, isDragging })}
      >
        {dragPreview(
          <div className="tcfArrayWidgetMember--panel">
            <div className="tcfArrayWidgetMember--header">
              {dragSource(
                <div className="tcfArrayWidgetMember--headerHandle">
                  <Icon
                    className="tcfArrayWidgetMember--headerHandleIcon"
                    key="handle"
                    name="move"
                  />
                  <span>{`Member #${index + 1}`}</span>
                </div>
              )}
              <div className="tcfArrayWidgetMember--headerActions">
                <Button onClick={this.handleDelete}>
                  <Icon name="remove" />
                  <Text value="Delete" />
                </Button>
              </div>
            </div>
            <div className="tcfArrayWidgetMember--body">
              <Field
                data={child}
                errors={[]}
                field={field}
                model={model}
                onUpdate={this.handleUpdate}
                path={path}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default dragSource(DefaultMember);
