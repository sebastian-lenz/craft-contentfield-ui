import type { CardType, Reference, ReferenceValue } from '../../store/models';
import type { ViewMode } from './index';

let nextId = 0;
let parser: DOMParser;

function parseElement<T extends Element>(html: string): T | null {
  const instance = parser || (parser = new DOMParser());
  const doc = instance.parseFromString(html, 'text/html');

  return doc.body.firstElementChild as T | null;
}

function getCard(reference: Reference, type: CardType): HTMLElement {
  const card = reference.cards[type];
  const id = `pageContent-action-menu-${nextId++}`;
  const injectId = (value: string) =>
    value.replace(/pageContent-action-menu/g, id);

  if (card.script) {
    setTimeout(() => {
      const script = document.createElement('script');
      script.innerHTML = injectId(card.script);
      document.body.append(script);
    }, 100);
  }

  return (
    parseElement<HTMLElement>(injectId(card.html)) ||
    document.createElement('div')
  );
}

export function getCardByViewMode(
  reference: Reference,
  viewMode: ViewMode
): HTMLElement {
  switch (viewMode) {
    case 'large':
      return getCard(reference, 'largeChip');
    case 'list':
      return getCard(reference, 'smallChip');
    default:
      return getCard(reference, 'card');
  }
}

export function isReferenceValue(value: any): value is ReferenceValue {
  return (
    typeof value === 'object' &&
    'id' in value &&
    'siteId' in value &&
    typeof value.id == 'number' &&
    typeof value.siteId == 'number'
  );
}

export function referenceEuqals(
  lft: Reference | ReferenceValue,
  rgt: Reference | ReferenceValue
): boolean {
  return lft.id == rgt.id && lft.siteId == rgt.siteId;
}

export function toListClass(viewMode: ViewMode) {
  switch (viewMode) {
    case 'large':
      return 'elements chips inline-chips';
    case 'list':
      return 'elements chips';
    case 'grid':
      return 'elements card-grid';
    default:
      return 'elements cards';
  }
}

export function toSize(value: ViewMode): 'large' | 'small' {
  return value === 'list' ? 'small' : 'large';
}
