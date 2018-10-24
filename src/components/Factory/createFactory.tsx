import * as React from 'react';

import Factory, { FactoryCallback } from './index';
import { FactoryProps, FactoryComponent } from '../Field/types';
import { Field } from '../../store/models';

export default function createFactory<T extends Field>(
  callback: FactoryCallback<T>
): FactoryComponent<T> {
  return function(props: FactoryProps<T>) {
    return <Factory {...props} callback={callback} />;
  };
}
