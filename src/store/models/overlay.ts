export interface EditOverlayState {
  type: 'edit';
  uuid: string;
}

export type OverlayState = null | EditOverlayState;
