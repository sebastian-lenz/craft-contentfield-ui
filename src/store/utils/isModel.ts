import { Model } from '../models';

export default function isModel(data: any): data is Model {
  return (
    data && typeof data === 'object' && '__type' in data && '__uuid' in data
  );
}
