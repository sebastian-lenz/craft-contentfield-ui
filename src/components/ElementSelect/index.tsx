import * as React from 'react';
import { connect } from 'react-redux';

import Display from './Display';
import Input from './Input';
import { addReferences, fetchReferences } from '../../store/actions';
import { RootState, Reference, ReferenceValue } from '../../store/models';

export type ViewMode = 'cards' | 'grid' | 'large' | 'list';

export interface ExternalProps {
  allowSelfReference?: boolean;
  condition?: any;
  criteria?: Craft.BaseElementSelectCriteria | null;
  data?: Array<ReferenceValue>;
  disabled?: boolean;
  elementType: string;
  limit: number | null;
  modalStorageKey?: string | null;
  referenceElementId?: number | null;
  referenceElementSiteId?: number | null;
  showActionMenu?: boolean;
  showSiteMenu?: boolean | string;
  sources: string[] | null;
  onUpdate: (references: Array<ReferenceValue>) => void;
  viewMode: ViewMode;
}

export interface Props extends ExternalProps {
  onAddReferences: (references: Array<ReferenceValue>) => void;
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
    onAddReferences: (references: Array<ReferenceValue>) => {
      dispatch(fetchReferences(references));
    },
  })
)(ElementSelect);
