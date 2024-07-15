import * as React from 'react';
import { useState } from 'react';

import { createShapes } from './shapes';
import { Dialog } from './Dialog';
import { Image } from './Image';
import { Toolbar } from './Toolbar';
import { Transform } from './tools/Transform';
import { useHotspotViewport } from '../utils/useHotspotViewport';

import type { HotspotAsset } from '../utils/useHotspotAsset';
import type { Tool } from './tools';
import type {
  AnyHotspotShape,
  HotspotShape,
  HotspotShapeType,
  Point,
} from '../types';

import './HotspotEditor.styl';

export interface Props {
  allowedShapes?: Array<HotspotShapeType>;
  asset: HotspotAsset;
  maxShapes?: number;
  onChange: (shapes: Array<AnyHotspotShape>) => void;
  onClose?: VoidFunction;
  shapes: Array<AnyHotspotShape>;
}

export function Editor(props: Props) {
  const { asset, maxShapes, onClose, shapes } = props;
  const viewport = useHotspotViewport(asset);

  const ref = React.useRef<SVGSVGElement>(null);
  const [tool, onTool] = useState<Tool | null>(null);

  function onSelect(shape: HotspotShape, origin: Point | null = null) {
    onTool({
      Component: Transform,
      props: { key: shape.uuid, origin, uuid: shape.uuid },
    });
  }

  return (
    <Dialog onClose={onClose}>
      <div className="tcfHotspotEditor">
        <Toolbar
          allowCreate={!maxShapes || shapes.length < maxShapes}
          allowDelete={shapes.length > 0}
          allowedShapes={props.allowedShapes}
          currentTool={tool ? tool.Component : null}
          onChange={props.onChange}
          onTool={onTool}
        />

        <Image
          height={viewport.height}
          ref={ref}
          url={asset.editUrl}
          width={viewport.width}
          onImagePointerDown={() => onTool(null)}
        >
          {createShapes(shapes, { onSelect, viewport })}
          {tool ? (
            <tool.Component
              {...tool.props}
              {...props}
              onTool={onTool}
              svg={ref.current}
              viewport={viewport}
            />
          ) : null}
        </Image>
      </div>
    </Dialog>
  );
}
