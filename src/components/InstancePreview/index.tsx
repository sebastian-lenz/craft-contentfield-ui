import * as React from 'react';
import { SafeString } from 'handlebars';
import { connect } from 'react-redux';

import isModel from '../../store/utils/isModel';

import {
  AnyField,
  ArrayField,
  Model,
  Reference,
  ReferenceField,
  RootState,
  Schemas,
} from '../../store/models';

import './index.styl';

function renderReference(
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

export type Renderable<T = { [name: string]: any }> = T & {
  toHTML: () => string;
};

export interface ExternalProps {
  className?: string;
  model: Model;
  onClick?: () => void;
}

export interface Props extends ExternalProps {
  i18nCategory: string;
  references: Array<Reference>;
  schemas: Schemas;
}

export class InstancePreview extends React.PureComponent<Props> {
  extractArrayData(value: any, field: ArrayField): Array<any> | null {
    if (!Array.isArray(value)) {
      return null;
    }

    return value.map(value => this.extractFieldData(value, field.member));
  }

  extractFieldData(data: any, field: AnyField) {
    switch (field.type) {
      case 'array':
        return this.extractArrayData(data, field);
      case 'instance':
        return this.extractSchemaData(data);
      case 'reference':
        return this.extractReferenceData(data, field);
      case 'string':
        return new SafeString(
          `<div class="tcfInstancePreview--textSnippet">${data}</div>`
        );
      default:
        return null;
    }
  }

  extractReferenceData(value: any, field: ReferenceField): Array<any> | null {
    const { references } = this.props;
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
            return new SafeString(renderReference(reference, 'large', false));
          },
          largeImage: () => {
            return new SafeString(renderReference(reference, 'large', true));
          },
          small: () => {
            return new SafeString(renderReference(reference, 'small', false));
          },
          smallImage: () => {
            return new SafeString(renderReference(reference, 'small', true));
          },
          toHTML: () => {
            return renderReference(reference);
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

  extractSchemaData(value: any): any {
    if (!isModel(value)) {
      return null;
    }

    const schema = this.props.schemas[value.__type];
    if (!schema) {
      return null;
    }

    const { previewTemplate } = schema;
    if (previewTemplate === null) {
      return Craft.t(this.props.i18nCategory, schema.label);
    }

    const data: any = {
      toString: () => previewTemplate(data),
    };

    for (const name of Object.keys(schema.fields)) {
      data[name] = this.extractFieldData(value[name], schema.fields[name]);
    }

    return data;
  }

  render() {
    const { className, model, onClick } = this.props;
    const data = this.extractSchemaData(model);

    try {
      const innerHTML = {
        __html: data ? data.toString() : '',
      };

      return (
        <div
          className={className}
          dangerouslySetInnerHTML={innerHTML}
          onClick={onClick}
        />
      );
    } catch (error) {
      return (
        <div className={className}>
          <p>
            <span className="tcfIcon material">error</span>
            <span>Could not render preview.</span>
          </p>
          {error && typeof error === 'object' && 'message' in error ? (
            <pre>{error.message}</pre>
          ) : null}
        </div>
      );
    }
  }
}

export default connect((state: RootState, props: ExternalProps) => ({
  i18nCategory: state.config.i18nCategory,
  references: state.config.references,
  schemas: state.schemas,
}))(InstancePreview);
