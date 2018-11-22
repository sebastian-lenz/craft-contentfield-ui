export interface SyncState {
  message?: string;
  status: 'idle' | 'working' | 'error' | 'finished';
}
