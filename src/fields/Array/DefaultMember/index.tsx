import * as React from 'react';
import cx from 'classnames';

import Button from '../../../components/Button';
import dragSource, { Props } from '../utils/dragSource';
import Field from '../../../components/Field';

class Member extends React.Component<Props> {
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
      dragSource,
      field,
      hasDropTarget,
      isDragging,
      model,
      path,
    } = this.props;

    return dragSource(
      <div
        className={cx('tcfArrayWidgetMember', { hasDropTarget, isDragging })}
      >
        <div className="tcfArrayWidgetMember--header">
          <Button onClick={this.handleDelete}>Delete</Button>
        </div>
        <div className="tcfArrayWidgetMember--body">
          <Field
            data={child}
            field={field}
            model={model}
            onUpdate={this.handleUpdate}
            path={path}
          />
        </div>
      </div>
    );
  }
}

export default dragSource(Member);
