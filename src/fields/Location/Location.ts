export interface Location {
  latitude: number;
  longitude: number;
}

export function isLocation(value: any): value is Location {
  return (
    typeof value === 'object' &&
    typeof value.latitude === 'number' &&
    typeof value.longitude === 'number'
  );
}
