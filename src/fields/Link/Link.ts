export type AnyLinkType = InputLinkType | ElementLinkType;

export type LinkTypeMap = { [name: string]: AnyLinkType };

export interface LinkType {
  label: string;
  type: string;
}

export interface InputLinkType extends LinkType {
  inputType: string;
  type: 'input';
}

export interface ElementLinkType extends LinkType {
  criteria?: Craft.BaseElementSelectCriteria | null;
  elementType: string;
  sources: Array<string> | null;
  type: 'element';
}

export interface Link {
  elementId: number;
  openInNewWindow: boolean;
  type: string;
  url: string;
}

export function isLink(value: any): value is Link {
  return (
    typeof value === 'object' &&
    typeof value.elementId === 'number' &&
    typeof value.type === 'string' &&
    typeof value.url === 'string'
  );
}
