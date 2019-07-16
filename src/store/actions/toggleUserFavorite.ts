import { Action, Dispatch } from 'redux';

import setUser from './setUser';
import { RootState } from '../models';
import { AnyAction } from '.';

export default function toggleUserFavorite(
  scope: string,
  qualifier: string
): AnyAction {
  return ((dispatch: Dispatch, getState: () => RootState) => {
    const { favoriteSchemas } = getState().user;
    let favorites = scope in favoriteSchemas ? favoriteSchemas[scope] : [];
    if (favorites.indexOf(qualifier) === -1) {
      favorites = [...favorites, qualifier];
    } else {
      favorites = favorites.filter(favorite => favorite !== qualifier);
    }

    dispatch(
      setUser({
        favoriteSchemas: {
          ...favoriteSchemas,
          [scope]: favorites,
        },
      })
    );
  }) as any;
}
