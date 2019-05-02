export default function required(value: any): string | null {
  if (value) return null;
  return 'Is required';
}
