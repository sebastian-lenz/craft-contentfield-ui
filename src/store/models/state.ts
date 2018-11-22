import { Config } from './config';
import { Model } from './model';
import { Schemas } from './schema';
import { SyncState } from './sync';

export interface RootState {
  config: Config;
  model: Model;
  schemas: Schemas;
  sync: SyncState;
}
