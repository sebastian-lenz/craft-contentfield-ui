import FieldManager from './FieldManager';
import { FieldTypeMap } from './includes';

export type FieldType = keyof FieldTypeMap;

export type AnyField = FieldTypeMap[keyof FieldTypeMap];

export default new FieldManager();
