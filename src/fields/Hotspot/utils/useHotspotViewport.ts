import { useEffect, useState } from 'react';
import type { HotspotAsset } from './useHotspotAsset';

export interface HotspotViewport {
  height: number;
  scale: number;
  width: number;
}

export function useHotspotViewport(
  asset: HotspotAsset,
  padding: number = 80
): HotspotViewport {
  const [viewport, setViewport] = useState(createViewport);

  function createViewport() {
    const height = window.innerHeight - 2 * padding;
    const width = window.innerWidth - 2 * padding;
    const scale = Math.min(1, height / asset.height, width / asset.width);

    return {
      scale,
      height: Math.round(asset.height * scale),
      width: Math.round(asset.width * scale),
    };
  }

  useEffect(() => {
    function onResize() {
      setViewport(createViewport());
    }

    window.addEventListener('resize', onResize);
    onResize();

    return () => window.removeEventListener('resize', onResize);
  }, [asset]);

  return viewport;
}
