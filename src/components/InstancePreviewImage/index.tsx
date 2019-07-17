import * as React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';

import getThumbLoader from '../../utils/getThumbLoader';
import { Model, RootState, Schema } from '../../store/models';

import './index.styl';

function getReferenceId(model: Model, schema: Schema) {
  const { previewImage } = schema;
  if (!previewImage) {
    return null;
  }

  const image = previewImage in model ? model[previewImage] : null;
  if (!Array.isArray(image) || image.length === 0) {
    return null;
  }

  const id = image[0];
  return typeof id === 'number' ? id : null;
}

export interface Props {
  className?: string;
  model: Model;
  schema: Schema;
  size?: 'large' | 'small';
}

export default function InstancePreviewImage({
  className,
  model,
  schema,
  size = 'small',
}: Props) {
  const element = React.useRef<HTMLDivElement>(null);
  const references = useSelector((state: RootState) => state.config.references);

  const id = getReferenceId(model, schema);
  const reference = references.find(reference => reference.id === id);

  React.useEffect(() => {
    if (element.current) {
      const $element = $('.element', element.current);
      Craft.setElementSize($element, size);
      getThumbLoader().load($element);
    }
  }, [element.current]);

  if (!reference || !reference.hasThumb) {
    return (
      <div className={cx('tcfInstancePreviewImage empty', className, size)} />
    );
  }

  return (
    <div
      className={cx('tcfInstancePreviewImage', className, size)}
      dangerouslySetInnerHTML={{ __html: reference.element }}
      ref={element}
    />
  );
}
