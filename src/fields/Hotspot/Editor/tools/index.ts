import type { HotspotViewport } from '../../utils';
import type { Props } from '../index';

export interface ToolProps extends Omit<Props, 'onClose'> {
  onTool: (tool: Tool | null) => void;
  svg: SVGSVGElement;
  viewport: HotspotViewport;
}

export interface Tool<T = any> {
  Component: React.ComponentType<T & ToolProps>;
  props: T;
}
