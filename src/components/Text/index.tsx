import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/models';

export interface ExternalProps {
  className?: string;
  category?: string;
  value: string;
}

export type Props = ExternalProps & {
  resolvedCategory: string;
};

export function Text({ className, resolvedCategory, value }: Props) {
  return <span className={className}>{Craft.t(resolvedCategory, value)}</span>;
}

export default connect((state: RootState, props: ExternalProps) => ({
  resolvedCategory: props.category || state.config.i18nCategory,
}))(Text);
