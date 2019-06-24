import findByUuid from './findByUuid';
import findOwner from './findOwner';
import { Command, commandFactories, CommandFactoryOptions } from '../commands';
import { RootState } from '../models';

export default function resolveCommands(
  state: RootState,
  uuid: string
): Array<Command> {
  const location = findByUuid(state, uuid);
  const commands: Array<Command> = [];
  if (!location) {
    return commands;
  }

  const options: CommandFactoryOptions = {
    location,
    owner: findOwner(state, location.path),
    state,
  };

  return commandFactories
    .map(factory => factory(options))
    .filter(command => command !== null) as Array<Command>;
}
