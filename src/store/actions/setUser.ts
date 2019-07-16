import { Action } from 'redux';

import { RootState } from '../models';
import { UserState } from '../models/user';

export const userSettingStorageKey = 'tcfUserState';

export interface SetUserAction extends Action {
  type: 'setUser';
  user: Partial<UserState>;
}

export function applySetUser(
  state: RootState,
  { user }: SetUserAction
): RootState {
  const newUser = {
    ...state.user,
    ...user,
  };

  try {
    window.localStorage.setItem(userSettingStorageKey, JSON.stringify(newUser));
  } catch (error) {
    console.error(error);
  }

  return {
    ...state,
    user: newUser,
  };
}

export default function setUser(user: Partial<UserState>): SetUserAction {
  return {
    type: 'setUser',
    user,
  };
}
