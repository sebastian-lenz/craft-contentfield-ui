import toHTML from '../../utils/toHTML';
import { Reference } from '../../store/models';
import { ReferencePreviewOptions } from './index';
import { SafeString } from 'handlebars';

function createPreviewItems({
  context: { references },
  field,
  value,
}: ReferencePreviewOptions) {
  const result: Array<ReferencePreviewItem> = [];
  if (!field) return result;

  const { elementType } = field;
  for (const id of value) {
    const reference = references.find(
      reference => reference.id === id && reference.type === elementType
    );

    if (reference) {
      result.push(new ReferencePreviewItem(reference));
    }
  }

  return result;
}

export class ReferencePreviewItem {
  reference: Reference;

  constructor(reference: Reference) {
    this.reference = reference;
  }

  createPreview(
    size: 'large' | 'small' = 'large',
    onlyThumb: boolean = true
  ): string {
    const { reference } = this;
    const $element = reference.$element.clone(false, true);
    $element.removeClass('large removable small');
    $element.addClass(size);

    const $thumb = $element.find('.elementthumb');
    if ($thumb.length) {
      let image: HTMLImageElement = $thumb.find('img')[0] as HTMLImageElement;
      if (!image) {
        image = document.createElement('img');
        image.srcset = $thumb.attr('data-srcset') || '';
        $thumb.append(image);
      }

      image.sizes = size === 'small' ? '30px' : '100px';
    }

    if (onlyThumb) {
      return `<div class="tcfInstancePreview--thumb ${size}">${
        $thumb ? $thumb.html() : ''
      }</div>`;
    }

    return $element[0].outerHTML;
  }

  createSafePreview(
    size: 'large' | 'small' = 'large',
    onlyThumb: boolean = true
  ): SafeString {
    return new SafeString(this.createPreview(size, onlyThumb));
  }

  get asBackground(): SafeString | null {
    const { reference } = this;
    const $thumb = reference.$element.find('.elementthumb');
    const srcset = $thumb.attr('data-srcset');
    if (!srcset) return null;

    const src = srcset.split(',').pop();
    if (!src) return null;

    return new SafeString(
      `<div class="tcfInstancePreview--background" style="background-image: url('${src.trim()}');"></div><div class="tcfInstancePreview--background blur" style="background-image: url('${src.trim()}');"></div>`
    );
  }

  get asLargeElement(): SafeString {
    return this.createSafePreview('large', false);
  }

  get asLargeImage(): SafeString {
    return this.createSafePreview('large', true);
  }

  get asSmallElement(): SafeString {
    return this.createSafePreview('small', false);
  }

  get asSmallImage(): SafeString {
    return this.createSafePreview('small', true);
  }

  toHTML(): SafeString {
    return new SafeString(this.toString());
  }

  toString(): string {
    return this.createPreview();
  }
}

export default class ReferencePreview extends Array<ReferencePreviewItem> {
  constructor(options: ReferencePreviewOptions) {
    super(...createPreviewItems(options));
  }

  get asBackground(): SafeString | null {
    return this.length ? this[0].asBackground : null;
  }

  get asLargeElement(): SafeString | null {
    return this.length ? this[0].asLargeElement : null;
  }

  get asLargeImage(): SafeString | null {
    return this.length ? this[0].asLargeImage : null;
  }

  get asSmallElement(): SafeString | null {
    return this.length ? this[0].asSmallElement : null;
  }

  get asSmallImage(): SafeString | null {
    return this.length ? this[0].asSmallImage : null;
  }

  toHTML(): SafeString {
    return new SafeString(
      `<div class="tcfInstancePreview--elements">${this.toString()}</div>`
    );
  }

  toString(): string {
    const result: Array<string> = [];
    for (let index = 0; index < this.length; index++) {
      result.push(toHTML(this[index]));
    }

    return result.join('');
  }
}
