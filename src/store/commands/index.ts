import { Dispatch } from 'redux';

import { AnyAction } from '../actions';
import { OwnerInfo } from '../utils/findOwner';
import { RootState } from '../models';
import { UuidLocation } from '../utils/findByUuid';

import copyCommand from './copyCommand';
import createCommand from './createCommand';
import cutCommand from './cutCommand';
import deleteCommand from './deleteCommand';
import editCommand from './editCommand';
import moveDownCommand from './moveDownCommand';
import moveUpCommand from './moveUpCommand';
import pasteCommand from './pasteCommand';
import visibilityCommand from './visibilityCommand';

export const commandFactories: Array<CommandFactory> = [
  createCommand,
  editCommand,
  deleteCommand,
  visibilityCommand,
  moveUpCommand,
  moveDownCommand,
  copyCommand,
  cutCommand,
  pasteCommand,
];

export type CommandFactoryOptions = {
  location: UuidLocation;
  owner: OwnerInfo | null;
  state: RootState;
};

export interface CommandFactory {
  (options: CommandFactoryOptions): Command | null;
}

export enum CommandGroup {
  Manipulation,
  Visibility,
  Movement,
  Clipboard,
}

export interface Command {
  group: CommandGroup;
  icon: string;
  id: string;
  invoke: (dispatch: Dispatch<AnyAction>, isPreview?: boolean) => void;
  label: string;
}
