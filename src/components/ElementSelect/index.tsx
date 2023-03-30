import * as React from 'react';
import { connect } from 'react-redux';

import Display from './Display';
import Input from './Input';
import { addReferences } from '../../store/actions';
import { RootState, Reference } from '../../store/models';

export interface ExternalProps {
  allowSelfReference?: boolean;
  condition?: any;
  criteria?: Craft.BaseElementSelectCriteria | null;
  data: Array<number> | undefined;
  disabled?: boolean;
  elementType: string;
  limit: number | null;
  modalStorageKey?: string | null;
  referenceElementId?: number | null;
  referenceElementSiteId?: number | null;
  showSiteMenu?: boolean | string;
  sources: string[] | null;
  onUpdate: (references: Array<number>) => void;
  viewMode: 'large' | 'small';
}

export interface Props extends ExternalProps {
  onAddReferences: (references: Array<Reference>) => void;
  references: Array<Reference>;
  sourceElementId: number | null;
}

export function ElementSelect(props: Props) {
  return props.disabled ? <Display {...props} /> : <Input {...props} />;
}

export default connect(
  (state: RootState) => ({
    references: state.config.references,
    sourceElementId: state.config.elementId,
  }),
  (dispatch) => ({
    onAddReferences: (references: Array<Reference>) => {
      dispatch(addReferences(references));
    },
  })
)(ElementSelect);
