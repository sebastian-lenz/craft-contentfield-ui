import * as React from 'react';
import { useSelector } from 'react-redux';

import DefaultMember from '../DefaultMember';
import Droplet from './Droplet';
import InstanceMember from '../InstanceMember';
import { AnyPathSegment } from '../../../store/utils/parsePath';
import { ArrayField } from '../index';
import { Context } from '../../../contexts/InstanceDepthProvider';
import { isUuidObject } from '../../../store/utils/uuidObject';
import { Model, RootState } from '../../../store/models';

import './index.styl';
import { DragProps } from '../utils/useDrag';
import { DropProps } from '../utils/useDrop';

export interface Props {
  children?: React.ReactNode;
  data: Array<any>;
  disabled?: boolean;
  field: ArrayField;
  limit: number;
  model: Model;
  onDelete: (index: number) => void;
  onUpdate: (index: number, value: any) => void;
  path: Array<AnyPathSegment>;
}

export interface ItemProps extends DragProps, DropProps {
  depth: number;
}

export default function List({
  children,
  data,
  disabled,
  field,
  model,
  onDelete,
  onUpdate,
  path: parentPath,
}: Props) {
  const { member, collapsible, previewMode } = field;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const schemas = useSelector((state: RootState) => state.schemas);
  const depth = React.useContext(Context);

  const members = data.map((child, index) => {
    const path: Array<AnyPathSegment> = [
      ...parentPath,
      { index, name: member.name, type: 'index' },
    ];

    const sharedProps = {
      child,
      depth,
      disabled,
      path,
    };

    if (member.type === 'instance') {
      return (
        <InstanceMember
          {...sharedProps}
          isCollapsible={collapsible}
          field={member}
          key={child.__uuid}
          previewMode={previewMode}
          schema={schemas[child.__type]}
        />
      );
    } else {
      return (
        <DefaultMember
          {...sharedProps}
          field={member}
          index={index}
          key={isUuidObject(child) ? child.__uuid : index}
          model={model}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      );
    }
  });

  if (members.length === 0) {
    members.push(<Droplet field={field} key="droplet" path={parentPath} />);
  }

  return (
    <>
      <div className="tcfArrayWidgetList" ref={ref}>
        {members}
      </div>
      <div className="tcfArrayWidgetList--footer">{children}</div>
    </>
  );
}
