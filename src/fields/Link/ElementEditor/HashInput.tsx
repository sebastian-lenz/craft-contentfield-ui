import * as React from 'react';
import { connect } from 'react-redux';

import AutoComplete from '../../../components/AutoComplete';
import Select from '../../../components/Select';
import useAnchors from './useSuggestions';
import { LinkHashMode } from '../Link';
import { RootState } from '../../../store/models';

export interface Props {
  apiEndpoint: string;
  defaultSiteId: number | null;
  disabled?: boolean;
  elementId: number;
  mode: boolean | LinkHashMode;
  onChange: (hash: string) => void;
  siteId: number | null;
  value: string;
}

export function HashInput({
  apiEndpoint,
  defaultSiteId,
  disabled,
  elementId,
  mode,
  onChange,
  siteId,
  value,
}: Props) {
  const { options, suggestions } = useAnchors({
    apiEndpoint,
    elementId,
    siteId: siteId || defaultSiteId,
  });

  if (mode === 'select') {
    return (
      <Select
        allowUndecided
        className="tcfLinkWidget--hashEditorSelectWrap"
        disabled={disabled}
        onChange={(value) => onChange(value === null ? '' : value)}
        options={options}
        selectClassName="tcfLinkWidget--hashEditorSelect"
        value={value}
      />
    );
  }

  return (
    <AutoComplete
      disabled={disabled}
      onChange={(event) => onChange(event.currentTarget.value)}
      suggestions={suggestions}
      value={value}
    />
  );
}

export default connect((state: RootState) => ({
  apiEndpoint: state.config.apiEndpoints.anchors,
  defaultSiteId: state.config.elementSiteId,
}))(HashInput);
