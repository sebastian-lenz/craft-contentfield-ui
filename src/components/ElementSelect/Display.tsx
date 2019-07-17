import * as React from 'react';

import getThumbLoader from '../../utils/getThumbLoader';
import { Props } from './index';
import { Reference } from '../../store/models';

function toReferences(props: Props) {
  const { data, elementType, references } = props;
  const result: Array<Reference> = [];

  if (Array.isArray(data)) {
    for (const id of data) {
      const reference = references.find(
        ref => ref.id === id && ref.type === elementType
      );

      if (reference) {
        result.push(reference);
      }
    }
  }

  return result;
}

export default function Display(props: Props) {
  const element = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const { current } = element;
    if (!current) return;

    const loader = getThumbLoader();

    for (const reference of toReferences(props)) {
      const $element = reference.$element.clone(false, true);
      $element.appendTo(current);

      Craft.setElementSize($element, props.viewMode);
      loader.load($element);
    }
  }, []);

  return (
    <div className="elementselect">
      <div className="elements" ref={element} />
    </div>
  );
}
