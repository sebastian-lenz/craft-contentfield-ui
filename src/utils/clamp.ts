export default function clamp(
  value: number,
  min: number = 0,
  max: number = 1
): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
