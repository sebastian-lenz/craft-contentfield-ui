import * as React from 'react';

import getThumbLoader from '../../utils/getThumbLoader';
import { Props } from './index';
import { Reference } from '../../store/models';
import {
  getCardByViewMode,
  referenceEuqals,
  toListClass,
  toSize,
} from './utils';

function toReferences(props: Props) {
  const { data, elementType, references } = props;
  const result: Array<Reference> = [];

  if (Array.isArray(data)) {
    for (const value of data) {
      const reference = references.find(
        (ref) => referenceEuqals(value, ref) && ref.type === elementType
      );

      if (reference) {
        result.push(reference);
      }
    }
  }

  return result;
}

export default function Display(props: Props) {
  const ref = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const { current } = ref;
    if (!current) return;

    const loader = getThumbLoader();

    for (const reference of toReferences(props)) {
      const el = getCardByViewMode(reference, props.viewMode);
      current.append(el);
      loader.load($(el));
    }
  }, []);

  return (
    <div className="elementselect">
      <ul className={toListClass(props.viewMode)} ref={ref} />
    </div>
  );
}
