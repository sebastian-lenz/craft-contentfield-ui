import cx from 'classnames';
import * as React from 'react';

import { Image } from '../Editor/Image';
import { createShapes } from '../Editor/shapes';
import type { AnyHotspotShape } from '../types';
import type { HotspotAsset, HotspotViewport } from '../utils';

import './HotspotPreview.styl';

export interface Props {
  asset: HotspotAsset;
  onClick?: VoidFunction;
  shapes: Array<AnyHotspotShape>;
}

export function Preview({ asset, onClick, shapes }: Props) {
  const scale = Math.min(120 / asset.width, 120 / asset.height);
  const viewport: HotspotViewport = {
    height: Math.round(asset.height * scale),
    scale,
    width: Math.round(asset.width * scale),
  };

  return (
    <div
      className={cx('tcfHotspotPreview', { clickable: !!onClick })}
      onClick={onClick}
    >
      <div className="tcfHotspotPreview__thumb">
        <Image
          height={Math.round(viewport.height)}
          url={asset.previewUrl}
          width={Math.round(viewport.width)}
        >
          {createShapes(shapes, { isPreview: true, viewport })}
        </Image>
      </div>
    </div>
  );
}
