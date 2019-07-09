import * as React from 'react';

import ColorInput from '../../components/ColorInput';
import { ColorField } from './index';
import { defaultColor, isColor } from '../../components/ColorInput/Color';
import { WidgetProps } from '../FieldDefinition';

export type Props = WidgetProps<ColorField>;

export default function ColorWidget({
  data,
  disabled,
  field,
  onUpdate,
}: Props) {
  const color = isColor(data) ? data : defaultColor();
  return (
    <ColorInput
      color={color}
      disableAlpha={field.disableAlpha}
      disabled={disabled}
      onChange={onUpdate}
      presetColors={field.presetColors}
    />
  );
}
