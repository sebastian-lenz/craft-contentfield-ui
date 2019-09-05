export interface OverlayStateBase {
  preventClose?: boolean;
  type: string;
}

export interface CreateOverlayState extends OverlayStateBase {
  afterCreate?: 'expand' | 'layer';
  type: 'create';
  uuid: string;
}

export interface EditOverlayState extends OverlayStateBase {
  type: 'edit';
  uuid: string;
}

export interface SynchronizeOverlayState extends OverlayStateBase {
  type: 'synchronize';
}

export type OverlayState =
  | null
  | CreateOverlayState
  | EditOverlayState
  | SynchronizeOverlayState;
