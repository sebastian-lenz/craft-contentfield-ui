import { getGoogleMapsApiKey } from './utils/requireGoogleMaps';
import { hbsMethod, hbsProperty } from '../../utils/hbsOptions';
import { Location } from './Location';
import { PreviewObject } from '../FieldDefinition';
import { SafeString } from 'handlebars';
import { createUrl } from '../../store/utils/createUrl';

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

    const url = createUrl('https://maps.googleapis.com/maps/api/staticmap', {
      key,
      center: `${latitude},${longitude}`,
      markers: `size:small|${latitude},${longitude}`,
      size: `${width}x${height}`,
      zoom: 15,
      maptype: 'roadmap',
    });

    return new SafeString(`
      <img src="${url}" width="${width}" height="${height}" />
    `);
  }

  @hbsMethod
  toHTML(): SafeString {
    return this.createStaticMap();
  }
}
