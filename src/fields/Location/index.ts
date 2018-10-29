import LocationWidget from './LocationWidget';
import { Field } from '../../store/models';
import { Location, isLocation } from './Location';

import FieldDefinition, {
  PreviewResult,
  PreviewOptions,
  CreateOptions,
} from '../FieldDefinition';
import LocationPreview from './LocationPreview';

export interface LocationField extends Field {
  defaultValue?: Location;
  type: 'location';
}

export default class LocationFieldType extends FieldDefinition<
  LocationField,
  Location
> {
  constructor() {
    super({
      widget: LocationWidget,
    });
  }

  createValue({ field }: CreateOptions<LocationField>): Location {
    if (isLocation(field.defaultValue)) {
      return { ...field.defaultValue };
    }

    return { latitude: 0, longitude: 0 };
  }

  isValue(field: LocationField, value: any): value is Location {
    return isLocation(value);
  }

  preview({ value }: PreviewOptions<LocationField, Location>): PreviewResult {
    return new LocationPreview(value);
  }
}
