import * as React from 'react';
import cx from 'classnames';

import getThumbLoader from '../../utils/getThumbLoader';
import { Reference } from '../../store/models';
import { Props as SharedProps } from './index';
import { referenceEuqals } from '../ElementSelect/utils';

export interface Props extends SharedProps {
  reference: Reference;
}

export function createAssetPreview(
  props: SharedProps,
  value: any,
  references: Reference[]
) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  const reference = references.find((reference) =>
    referenceEuqals(reference, value[0])
  );

  if (!reference) {
    return null;
  }

  return <AssetPreview {...props} reference={reference} />;
}

export function AssetPreview({ className, reference, size = 'small' }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const $element = $('.element', ref.current);
      getThumbLoader().load($element);
    }
  }, [ref.current, reference]);

  const card = reference.cards[size === 'large' ? 'largeChip' : 'smallChip'];

  return (
    <div
      className={cx('tcfInstancePreviewImage', className, size)}
      dangerouslySetInnerHTML={{
        __html: card.html,
      }}
      ref={ref}
    />
  );
}
