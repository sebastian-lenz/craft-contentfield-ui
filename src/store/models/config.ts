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
    fetchSite: string;
    oembed: string;
    translate: string;
  };
  googleMapsApiKey?: string;
  elementId: number | null;
  elementSiteId: number | null;
  fieldHandle: string;
  i18nCategory: string;
  references: Array<Reference>;
  rootSchemas: Array<string>;
  supportedSites: Array<Site>;
}
