import * as React from 'react';
import cx from 'classnames';

import Field from '../../../components/Field';
import Icon from '../../../components/Icon';
import useDrag from '../utils/useDrag';
import useDrop from '../utils/useDrop';
import { ItemProps } from '../List';
import { Model } from '../../../store/models';

import './index.styl';

export interface Props extends ItemProps {
  index: number;
  model: Model;
  onDelete: (index: number) => void;
  onUpdate: (index: number, value: any) => void;
}

export default function DefaultMember(props: Props) {
  const {
    child,
    depth,
    disabled,
    field,
    index,
    model,
    onDelete,
    onUpdate,
    path,
  } = props;

  const ref = React.useRef<HTMLDivElement | null>(null);
  const [{ isDragging }, dragSource, dragPreview] = useDrag(props, ref);
  const [, drop] = useDrop(props, ref);
  drop(ref);

  const handleDelete = () => {
    onDelete(index);
  };

  const handleUpdate = (value: any) => {
    onUpdate(index, value);
  };

  return (
    <div
      className={cx(`tcfArrayWidgetMember depth-${depth}`, {
        isDragging,
      })}
      ref={ref}
    >
      {dragPreview(
        <div className="tcfArrayWidgetMember--panel tcfArrayWidgetMember--single">
          {dragSource(
            <div
              className={cx('tcfArrayWidgetMember--singleHandle', {
                enabled: !disabled,
              })}
            >
              <Icon
                className="tcfArrayWidgetMember--singleHandleIcon"
                key="handle"
                name="move"
              />
            </div>
          )}
          <div className="tcfArrayWidgetMember--singleBody">
            <Field
              data={child}
              disabled={disabled}
              errors={[]}
              field={field}
              model={model}
              onUpdate={handleUpdate}
              path={path}
            />
          </div>
          {!disabled ? (
            <div className="tcfArrayWidgetMember--singleActions">
              <div
                className="tcfArrayWidgetMember--singleActionsButton"
                onClick={handleDelete}
              >
                <Icon name="remove" />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
