import ColorWidget from './ColorWidget';
import { Field } from '../../store/models';

import {
  RgbColor,
  isColor,
  defaultColor,
} from '../../components/ColorInput/Color';

import FieldDefinition, {
  PreviewResult,
  PreviewOptions,
  CreateOptions,
} from '../FieldDefinition';

export interface ColorField extends Field {
  disableAlpha: boolean;
  presetColors: string[] | null;
  type: 'color';
}

export default class ColorFieldType extends FieldDefinition<
  ColorField,
  RgbColor
> {
  constructor() {
    super({
      widget: ColorWidget,
    });
  }

  createValue(options: CreateOptions<ColorField>): RgbColor {
    return defaultColor();
  }

  isValue(field: ColorField, value: any): value is RgbColor {
    return isColor(value);
  }

  preview({
    context,
    value,
  }: PreviewOptions<ColorField, RgbColor>): PreviewResult {
    return '';
  }
}
