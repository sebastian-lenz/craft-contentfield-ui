import { Config } from './config';
import { Model } from './model';
import { OverlayState } from './overlay';
import { Schemas } from './schema';
import { SyncState } from './sync';

export interface RootState {
  config: Config;
  model: Model;
  overlay: OverlayState;
  schemas: Schemas;
  sync: SyncState;
}
