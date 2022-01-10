export default function isError(value: any): value is Error {
  return value && typeof value === 'object' && 'message' in value;
}
