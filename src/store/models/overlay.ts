export interface OverlayStateBase {
  preventClose?: boolean;
  type: string;
}

export interface EditOverlayState extends OverlayStateBase {
  type: 'edit';
  uuid: string;
}

export interface SynchronizeOverlayState extends OverlayStateBase {
  type: 'synchronize';
}

export type OverlayState = null | EditOverlayState | SynchronizeOverlayState;
