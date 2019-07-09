import * as React from 'react';

import ActivityIndicator from '../../components/ActivityIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import requireGoogleMaps from './utils/requireGoogleMaps';
import Search from './Search';
import { LocationField } from './index';
import { isLocation, Location } from './Location';
import { WidgetProps } from '../FieldDefinition';

import './LocationWidget.styl';

const defaultZoom = 17;

export type MapInstance = {
  element: HTMLDivElement;
  map: google.maps.Map;
  places: google.maps.places.PlacesService;
};

export enum LoadState {
  Loading,
  Error,
  Ready,
}

export type Props = WidgetProps<LocationField> & {
  apiKey?: string;
};

export interface State {
  instance: MapInstance | null;
  loadState: LoadState;
}

export default class LocationWidget extends React.Component<Props, State> {
  element: HTMLDivElement | null = null;
  marker: google.maps.Marker | null = null;
  state: State = {
    instance: null,
    loadState: LoadState.Loading,
  };

  static instanceStash: Array<MapInstance> = [];

  componentDidUpdate(prevProps: Props) {
    const { marker } = this;
    if (prevProps.disabled !== this.props.disabled && marker) {
      marker.setOptions({ draggable: !this.props.disabled });
    }
  }

  componentWillMount() {
    try {
      requireGoogleMaps().then(() => {
        this.setState({
          loadState: LoadState.Ready,
        });
      });
    } catch (e) {
      this.setState({
        loadState: LoadState.Error,
      });
    }
  }

  getLatLng(): google.maps.LatLngLiteral {
    const { data } = this.props;
    if (!isLocation(data)) {
      return { lat: 0, lng: 0 };
    }

    return {
      lat: data.latitude,
      lng: data.longitude,
    };
  }

  handleLocation = (location: Location) => {
    const { instance } = this.state;
    if (instance) {
      instance.map.setZoom(defaultZoom);
      instance.map.setCenter({
        lat: location.latitude,
        lng: location.longitude,
      });
    }

    this.props.onUpdate(location);
  };

  handleMarkerDragEnd = () => {
    const { marker } = this;
    if (!marker) return;

    const position = marker.getPosition();
    if (position) {
      this.props.onUpdate({
        latitude: position.lat(),
        longitude: position.lng(),
      });
    }
  };

  render() {
    const { loadState, instance } = this.state;
    const { disabled, model } = this.props;
    const { marker } = this;
    if (marker) {
      marker.setPosition(this.getLatLng());
    }

    let content: React.ReactNode;
    if (loadState === LoadState.Loading) {
      content = <ActivityIndicator />;
    } else if (loadState === LoadState.Error) {
      content = <ErrorMessage title="Could not load Google Maps" />;
    } else {
      content = (
        <>
          {disabled ? null : (
            <Search
              model={model}
              onLocation={this.handleLocation}
              places={instance ? instance.places : null}
            />
          )}
          <div className="tcfLocation--map" ref={this.setElement} />
        </>
      );
    }

    return <div className="tcfLocation">{content}</div>;
  }

  setElement = (element: HTMLDivElement | null) => {
    const { disabled } = this.props;
    let { instance } = this.state;
    let { marker } = this;

    if (instance) {
      LocationWidget.stashInstance(instance);
      instance = null;
    }

    if (marker) {
      marker.setMap(null);
      marker.unbindAll();
      marker = null;
    }

    if (element) {
      instance = LocationWidget.createInstance();
      element.appendChild(instance.element);

      const { map } = instance;
      map.setZoom(defaultZoom);
      map.setCenter(this.getLatLng());

      marker = new google.maps.Marker({
        draggable: !disabled,
        position: this.getLatLng(),
        map,
      });

      marker.addListener('dragend', this.handleMarkerDragEnd);
    }

    this.element = element;
    this.marker = marker;
    this.setState({ instance });
  };

  static createInstance(): MapInstance {
    let instance = this.instanceStash.pop();
    if (!instance) {
      const element = document.createElement('div');
      element.className = 'tcfLocation--mapInstance';

      const map = new google.maps.Map(element, {
        mapTypeControl: false,
        streetViewControl: false,
      });

      instance = {
        element,
        map,
        places: new google.maps.places.PlacesService(map),
      };
    }

    return instance;
  }

  static stashInstance(instance: MapInstance) {
    const { element } = instance;
    const { parentElement } = element;
    if (parentElement) {
      parentElement.removeChild(element);
    }

    this.instanceStash.push(instance);
  }
}
