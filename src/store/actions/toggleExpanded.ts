import { Action } from 'redux';

import { RootState } from '../models';

export interface ToggleExpandedAction extends Action {
  expand?: boolean;
  type: 'toggleExpanded';
  uuid: string;
}

export function applyToggleExpanded(
  state: RootState,
  action: ToggleExpandedAction
): RootState {
  const expanded = state.config.expanded.slice();
  const index = expanded.indexOf(action.uuid);
  const isExpanded = index !== -1;
  if ('expand' in action && action.expand === isExpanded) {
    return state;
  }

  if (isExpanded) {
    expanded.splice(index, 1);
  } else {
    expanded.push(action.uuid);
  }

  return {
    ...state,
    config: {
      ...state.config,
      expanded,
    },
  };
}

export default function toggleExpanded(
  uuid: string,
  expand?: boolean
): ToggleExpandedAction {
  return {
    expand,
    type: 'toggleExpanded',
    uuid,
  };
}
