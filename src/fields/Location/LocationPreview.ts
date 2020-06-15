import { getGoogleMapsApiKey } from './utils/requireGoogleMaps';
import { hbsMethod, hbsProperty } from '../../utils/hbsOptions';
import { Location } from './Location';
import { PreviewObject } from '../FieldDefinition';
import { SafeString } from 'handlebars';

export default class LocationPreview implements PreviewObject {
  @hbsProperty
  latitude: number;

  @hbsProperty
  longitude: number;

  constructor(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  @hbsMethod
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

  @hbsMethod
  toHTML(): SafeString {
    return this.createStaticMap();
  }
}
