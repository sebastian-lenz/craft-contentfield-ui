export interface Reference {
  $element: JQuery;
  element: string;
  hasThumb: boolean;
  id: number;
  label: string;
  siteId: number;
  status: string;
  type: string;
  url: string;
}

export interface Site {
  id: number;
  label: string;
  language: string;
}

export interface Config {
  apiEndpoints: {
    anchors: string;
    fetchSite: string;
    oembed: string;
    translate: string;
  };
  csrfTokenName: string;
  csrfTokenValue: string;
  disabled: boolean;
  elementId: number | null;
  elementSiteId: number | null;
  fieldHandle: string;
  googleMapsApiKey?: string;
  hasTranslator: boolean;
  hideSyncButton?: boolean;
  references: Array<Reference>;
  rootSchemas: Array<string>;
  supportedSites: Array<Site>;
}
