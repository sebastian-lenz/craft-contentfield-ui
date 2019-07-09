import * as React from 'react';

import Lightswitch from '../../components/Lightswitch';
import { LightswitchField } from './index';
import { WidgetProps } from '../FieldDefinition';

export interface Props extends WidgetProps<LightswitchField> {}

export default function CheckboxWidget({ data, disabled, onUpdate }: Props) {
  return <Lightswitch disabled={disabled} onChange={onUpdate} value={!!data} />;
}
