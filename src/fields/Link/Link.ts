export type AnyLinkType = InputLinkType | ElementLinkType;

export type LinkTypeMap = { [name: string]: AnyLinkType };

export type LinkHashMode = 'input' | 'select';

export interface LinkType {
  label: string;
  type: string;
}

export interface InputLinkType extends LinkType {
  inputType: string;
  type: 'input';
}

export interface ElementLinkType extends LinkType {
  allowHash?: boolean | LinkHashMode;
  criteria?: Craft.BaseElementSelectCriteria | null;
  elementType: string;
  sources: Array<string> | null;
  type: 'element';
}

export interface Link {
  elementId: number;
  hash: string;
  openInNewWindow: boolean;
  type: string;
  url: string;
}

export function isLink(value: any): value is Link {
  return (
    typeof value === 'object' &&
    typeof value.elementId === 'number' &&
    typeof value.hash === 'string' &&
    typeof value.type === 'string' &&
    typeof value.url === 'string'
  );
}
