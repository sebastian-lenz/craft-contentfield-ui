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

export interface Config {
  elementId: number | null;
  expanded: Array<string>;
  i18nCategory: string;
  references: Array<Reference>;
  rootSchemas: Array<string>;
}
