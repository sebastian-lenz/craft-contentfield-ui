import * as React from 'react';
import translate, { TranslateParams } from '../../store/utils/translate';

export interface Props {
  className?: string;
  params?: TranslateParams;
  value: string;
}

export default function Text({ className, params, value }: Props) {
  return <span className={className}>{translate(value, params)}</span>;
}
