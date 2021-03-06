import resolveCommands from './resolveCommands';
import { AnyAction } from '../actions';
import { Command } from '../commands';
import { RootState } from '../models';
import { Store, Unsubscribe } from 'redux';
import { UuidLocation } from './findByUuid';

export interface InstanceApi {
  getCommands: () => Array<Command>;
  subscribe: (listener: () => void) => void;
  unsubscribe: () => void;
}

export default function createInstanceApi(
  store: Store<RootState, AnyAction>,
  { uuid }: UuidLocation
): InstanceApi {
  let unsubscribe: Unsubscribe | null = null;

  return {
    getCommands: () => {
      return resolveCommands(store.getState(), uuid).map(command => ({
        ...command,
        invoke: () => command.invoke(store.dispatch, true),
      }));
    },
    subscribe: (listener: () => void) => {
      if (unsubscribe) unsubscribe();
      unsubscribe = store.subscribe(listener);
    },
    unsubscribe: () => {
      if (unsubscribe) unsubscribe();
      unsubscribe = null;
    },
  };
}
