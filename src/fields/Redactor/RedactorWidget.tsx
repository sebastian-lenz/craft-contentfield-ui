import * as React from 'react';
import { connect } from 'react-redux';

import uuid from '../../store/utils/uuid';
import { RedactorField } from './index';
import { RootState } from '../../store/models';
import { WidgetProps } from '../FieldDefinition';
import Redactor from '../../components/Redactor';

export type ExternalProps = WidgetProps<RedactorField>;

export interface Props extends ExternalProps {
  elementSiteId: number | null;
}

export function RedactorWidget({
  data,
  disabled,
  elementSiteId,
  field,
  onUpdate,
}: Props) {
  return field.redactor ? (
    <Redactor
      disabled={disabled}
      elementSiteId={elementSiteId}
      onUpdate={onUpdate}
      options={field.redactor}
      value={data}
    />
  ) : null;
}

export default connect((state: RootState) => ({
  elementSiteId: state.config.elementSiteId,
}))(RedactorWidget);
