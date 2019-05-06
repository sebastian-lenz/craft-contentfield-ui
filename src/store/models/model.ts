export type ErrorMap = { [name: string]: Array<string> };

export type Validator = (
  attribute: string,
  value: any,
  messages: string[]
) => void;

export type ValidatorMap = { [id: string]: Validator };

export interface Model {
  __type: string;
  __uuid: string;
  __originalUuid?: string;
  __errors: ErrorMap;
  [name: string]: any;
}
