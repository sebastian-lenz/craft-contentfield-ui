import { Dispatch } from 'redux';

import addReferences from './addReferences';
import { createUrl } from '../utils/createUrl';
import type { AnyAction } from './index';
import type { RootState, ReferenceValue } from '../models';

export async function applyFetchReferences(
  references: Array<ReferenceValue>,
  dispatch: Dispatch,
  getState: () => RootState
) {
  const {
    config: { apiEndpoints, elementSiteId },
  } = getState();

  const requests = references.map((reference) =>
    fetch(
      createUrl(apiEndpoints.reference, {
        id: reference.id,
        siteId: reference.siteId || elementSiteId,
      })
    ).then((res) => res.json())
  );

  Promise.all(requests).then((references) =>
    dispatch(addReferences(references))
  );
}

export default function fetchReferences(
  references: Array<ReferenceValue>
): AnyAction {
  return (async (dispatch: Dispatch, getState: any) => {
    try {
      await applyFetchReferences(references, dispatch, getState);
    } catch (error) {
      // Ignore
    }
  }) as any;
}
