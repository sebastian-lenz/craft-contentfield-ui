export interface FavoriteSchemas {
  [qualifier: string]: Array<string>;
}

export interface UserState {
  favoriteSchemas: FavoriteSchemas;
}
