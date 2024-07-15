import HotspotWidget from './HotspotWidget';
import { isHotspot } from './utils';

import FieldDefinition, {
  PreviewResult,
  PreviewOptions,
  CreateOptions,
} from '../FieldDefinition';

import type { Hotspot, HotspotField } from './types';
export type { HotspotField } from './types';

export default class HotspotFieldType extends FieldDefinition<
  HotspotField,
  Hotspot
> {
  constructor() {
    super({
      widget: HotspotWidget,
    });
  }

  createValue(options: CreateOptions<HotspotField>): Hotspot {
    return [];
  }

  isValue(field: HotspotField, value: any): value is Hotspot {
    return isHotspot(value);
  }

  preview({
    context,
    value,
  }: PreviewOptions<HotspotField, Hotspot>): PreviewResult {
    return '';
  }
}
