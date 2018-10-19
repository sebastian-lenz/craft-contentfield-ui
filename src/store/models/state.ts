import { Config } from './config';
import { Model } from './model';
import { Schemas } from './schema';

export interface RootState {
  config: Config;
  model: Model;
  schemas: Schemas;
}
