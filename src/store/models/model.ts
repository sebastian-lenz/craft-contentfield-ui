export type ErrorMap = { [name: string]: Array<string> };

export interface Model {
  __type: string;
  __uuid: string;
  __originalUuid?: string;
  __errors: ErrorMap;
  [name: string]: any;
}
