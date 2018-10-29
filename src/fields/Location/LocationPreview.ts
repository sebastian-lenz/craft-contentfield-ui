import { PreviewObject } from '../FieldDefinition';
import { Location } from './Location';
import { SafeString } from 'handlebars';
import { getGoogleMapsApiKey } from './utils/requireGoogleMaps';

export default class LocationPreview implements PreviewObject {
  latitude: number;
  longitude: number;

  constructor(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  createStaticMap(width: number = 100, height: number = 75): SafeString {
    const { latitude, longitude } = this;
    const key = getGoogleMapsApiKey();
    if (!key) {
      return new SafeString('');
    }

    const params = [
      `key=${key}`,
      `center=${encodeURIComponent(`${latitude},${longitude}`)}`,
      `markers=${encodeURIComponent(`size:small|${latitude},${longitude}`)}`,
      `size=${width}x${height}`,
      `zoom=15`,
      `maptype=roadmap`,
    ].join('&');

    return new SafeString(`
      <img src="https://maps.googleapis.com/maps/api/staticmap?${params}" width="${width}" height="${height}" />
    `);
  }

  toHTML(): SafeString {
    return this.createStaticMap();
  }
}
