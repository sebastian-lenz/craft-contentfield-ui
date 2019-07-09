import * as React from 'react';

import Button from '../../../components/Button';
import Flyout from '../../../components/Flyout';
import Text from '../../../components/Text';
import TextAndIcon from '../../../components/TextAndIcon';
import { Location } from '../Location';
import { Model } from '../../../store/models';

import './index.styl';
import Results from './Results';

const resolveFields = ['address', 'street', 'country', 'zip', 'city'];

export interface Props {
  model: Model;
  onLocation: (location: Location) => void;
  places: google.maps.places.PlacesService | null;
}

export interface State {
  isSearching: boolean;
  results?: Array<google.maps.places.PlaceResult>;
}

export default class Search extends React.Component<Props, State> {
  autocomplete: google.maps.places.Autocomplete | null = null;
  input: HTMLInputElement | null = null;
  state: State = {
    isSearching: false,
  };

  canResolve(): boolean {
    return this.getResolveQuery() !== '';
  }

  getResolveQuery(): string {
    const { model } = this.props;
    const components: Array<string> = [];

    for (const field of resolveFields) {
      if (field in model && typeof model[field] === 'string') {
        components.push(model[field].trim());
      }
    }

    return components.join(', ');
  }

  handlePlaceChanged = () => {
    const { autocomplete } = this;
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    this.props.onLocation({
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    });
  };

  handleResolve = () => {
    const { places } = this.props;
    if (!places) return;

    this.setState({
      isSearching: true,
    });

    places.findPlaceFromQuery(
      {
        query: this.getResolveQuery(),
        fields: ['formatted_address', 'geometry'],
      },
      this.handleResolveResults
    );
  };

  handleResolveResults = (
    results: Array<google.maps.places.PlaceResult> | null
  ) => {
    this.setState({
      isSearching: false,
    });

    if (!results) results = [];
    if (results.length === 1) {
      this.handleResultsSelect(results[0]);
    } else {
      this.setState({
        results,
      });
    }
  };

  handleResultsSelect = ({ geometry }: google.maps.places.PlaceResult) => {
    if (!geometry) {
      return;
    }

    const { location } = geometry;
    this.props.onLocation({
      latitude: location.lat(),
      longitude: location.lng(),
    });

    this.handleResultsCancel();
  };

  handleResultsCancel = () => {
    if (this.state.results) {
      this.setState({ results: undefined });
    }
  };

  render() {
    let resolve: React.ReactNode;
    if (this.canResolve()) {
      const { results } = this.state;
      let flyout: React.ReactNode;

      if (results && results.length === 0) {
        flyout = (
          <TextAndIcon icon="material:error">No locations found</TextAndIcon>
        );
      } else if (results) {
        flyout = (
          <Results onSelect={this.handleResultsSelect} results={results} />
        );
      }

      resolve = (
        <div className="tcfLocationFieldSearch--resolve">
          {flyout ? (
            <Flyout onClick={this.handleResultsCancel}>{flyout}</Flyout>
          ) : null}
          <Button onClick={this.handleResolve}>
            <Text value="Resolve address" />
          </Button>
        </div>
      );
    }

    return (
      <div className="tcfLocationFieldSearch">
        {resolve}
        <input
          className="tcfLocationFieldSearch--input tcfInput"
          ref={this.setInput}
          type="search"
        />
      </div>
    );
  }

  setInput = (input: HTMLInputElement | null) => {
    let { autocomplete } = this;
    this.input = input;

    if (autocomplete) {
      autocomplete.unbindAll();
      autocomplete = null;
    }

    if (input) {
      autocomplete = new google.maps.places.Autocomplete(input);
      (autocomplete as any).setFields(['geometry']);
      autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    this.autocomplete = autocomplete;
  };
}
