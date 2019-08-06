export enum GoogleMapsState {
  Idle,
  Loading,
  Loaded,
}

let apiKey: string | undefined;
let promise: Promise<typeof google.maps> | null = null;
let state: GoogleMapsState = GoogleMapsState.Idle;

export function setGoogleMapsApiKey(value?: string) {
  apiKey = value;
}

export function getGoogleMapsApiKey(): string | undefined {
  return apiKey;
}

export function getGoogleMapsState(): GoogleMapsState {
  return state;
}

export default function requireGoogleMaps(): Promise<typeof google.maps> {
  if (promise) {
    return promise;
  }

  return (promise = new Promise(resolve => {
    (<any>window)['onGoogleMapsReady'] = () => {
      state = GoogleMapsState.Loaded;
      resolve(google.maps);
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=onGoogleMapsReady`;
    (document.head || document.body).appendChild(script);

    promise = promise;
    state = GoogleMapsState.Loading;
  }));
}
