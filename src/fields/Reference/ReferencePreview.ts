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
    $element.removeClass('removable');

    if (!$element.hasClass(size)) {
      $element.removeClass(size === 'small' ? 'large' : 'small');
      $element.addClass(size);
    }

    const $thumb = $element.find('.elementthumb');
    if ($thumb) {
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

  large(): SafeString {
    return this.createSafePreview('large', false);
  }

  largeImage(): SafeString {
    return this.createSafePreview('large', true);
  }

  small(): SafeString {
    return this.createSafePreview('small', false);
  }

  smallImage(): SafeString {
    return this.createSafePreview('small', true);
  }

  toHTML(): string {
    return this.createPreview();
  }
}

export default class ReferencePreview extends Array<ReferencePreviewItem> {
  constructor(options: ReferencePreviewOptions) {
    super(...createPreviewItems(options));
  }

  toHTML(): string {
    return `<div class="tcfInstancePreview--elements">${this.map(item =>
      item.toHTML()
    ).join('')}</div>`;
  }
}
