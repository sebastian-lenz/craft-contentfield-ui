import { Reference } from '../../../store/models';
import { ReferenceField } from './index';
import { Renderable, PreviewContext } from '../../InstancePreview';
import { SafeString } from 'handlebars';

function previewReference(
  reference: Reference,
  size: 'large' | 'small' = 'large',
  onlyThumb: boolean = true
): string {
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

export default function preview(
  value: any,
  field: ReferenceField,
  context: PreviewContext
): Renderable | null {
  const { references } = context;
  if (!Array.isArray(value)) {
    return null;
  }

  const { elementType } = field;
  const result: Renderable<Array<Renderable>> = [] as any;

  value.forEach(id => {
    const reference = references.find(
      reference => reference.id === id && reference.type === elementType
    );

    if (reference) {
      result.push({
        ...reference,
        large: () => {
          return new SafeString(previewReference(reference, 'large', false));
        },
        largeImage: () => {
          return new SafeString(previewReference(reference, 'large', true));
        },
        small: () => {
          return new SafeString(previewReference(reference, 'small', false));
        },
        smallImage: () => {
          return new SafeString(previewReference(reference, 'small', true));
        },
        toHTML: () => {
          return previewReference(reference);
        },
      });
    }
  });

  result.toHTML = () => {
    return `<div class="tcfInstancePreview--elements">${result
      .map(result => result.toHTML())
      .join('')}</div>`;
  };

  return result;
}
