import required from './required';

export type Validator = (value: any, options?: any) => string | null;

export type ValidatorMap = { [type: string]: Validator };

const validators = { required } as ValidatorMap;

export default validators;
