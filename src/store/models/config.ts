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
}

export interface Config {
  apiEndpoint: string;
  googleMapsApiKey?: string;
  elementId: number | null;
  elementSiteId: number | null;
  expanded: Array<string>;
  fieldHandle: string;
  i18nCategory: string;
  references: Array<Reference>;
  rootSchemas: Array<string>;
  supportedSites: Array<Site>;
}
