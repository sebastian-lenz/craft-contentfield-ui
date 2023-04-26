import * as React from 'react';
import cx from 'classnames';

import { Props as SharedProps } from './index';
import { isOEmbed } from '../../fields/OEmbed/OEmbed';

export interface Props extends SharedProps {
  src: string;
}

export function createOEmbedPreview(props: SharedProps, value: any) {
  if (!isOEmbed(value) || !value.info || !value.info.thumbnail_url) {
    return null;
  }

  return <OEmbedPreview src={value.info.thumbnail_url} {...props} />;
}

export default function OEmbedPreview({
  className,
  size = 'small',
  src,
}: Props) {
  return (
    <div className={cx('tcfInstancePreviewImage', className, size)}>
      <img className="oembed" src={src} />
    </div>
  );
}
