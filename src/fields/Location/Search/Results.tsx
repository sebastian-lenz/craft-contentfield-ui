import * as React from 'react';

import './Results.styl';

export interface Props {
  onSelect: (result: google.maps.places.PlaceResult) => void;
  results: Array<google.maps.places.PlaceResult>;
}

export default function Results({ results, onSelect }: Props) {
  return (
    <div className="">
      {results.map(result => (
        <div onClick={() => onSelect(result)}>{result.formatted_address}</div>
      ))}
    </div>
  );
}
