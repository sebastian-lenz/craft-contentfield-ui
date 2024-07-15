import { useEffect, useState } from 'react';

import { findFieldByQuery } from '../../../store/utils/findByQuery';
import { scriptPath } from '../../../utils/scriptPath';
import {
  isReferenceValue,
  referenceEuqals,
} from '../../../components/ElementSelect/utils';

import type { Model, Reference, RootState } from '../../../store/models';
import { createUrl } from '../../../store/utils/createUrl';

export interface HotspotAsset {
  editUrl: string;
  height: number;
  listeners: Array<VoidFunction>;
  previewUrl: string;
  url: string;
  width: number;
}

const assets: Array<HotspotAsset> = [];

const defaultAssetUrl = `${scriptPath}/images/empty-pattern.webp`;

const defaultAsset: HotspotAsset = {
  editUrl: defaultAssetUrl,
  height: 500,
  listeners: [],
  previewUrl: defaultAssetUrl,
  url: defaultAssetUrl,
  width: 500,
};

function createAsset(state: RootState, ref: Reference): HotspotAsset {
  const url = createUrl(state.config.apiEndpoints.hotspotAsset, {
    id: ref.id,
    siteId: ref.siteId,
  });

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      Object.assign(asset, data);
      for (const listener of asset.listeners) {
        listener();
      }
    });

  const asset: HotspotAsset = {
    editUrl: ref.url,
    height: 0,
    listeners: [],
    previewUrl: ref.url,
    url: ref.url,
    width: 0,
  };

  assets.push(asset);
  return asset;
}

function listenTo(asset: HotspotAsset, callback: VoidFunction) {
  asset.listeners.push(callback);

  return () => {
    const index = asset.listeners.indexOf(callback);
    if (index !== -1) {
      asset.listeners.splice(index, 1);
    }
  };
}

function useReference(state: RootState, scope: Model, queries: Array<string>) {
  let value = null;

  for (const query of queries) {
    const values = findFieldByQuery(state, scope, query);

    if (values != null) {
      value = Array.isArray(values) ? values[0] : values;
      break;
    }
  }

  if (!isReferenceValue(value)) {
    return null;
  }

  const reference = state.config.references.find((reference) =>
    referenceEuqals(reference, value)
  );

  return reference && reference.type === 'craft\\elements\\Asset'
    ? reference
    : null;
}

export function useHotspotAsset(
  state: RootState,
  scope: Model,
  query: Array<string>
) {
  const [asset, setAsset] = useState(defaultAsset);
  const reference = useReference(state, scope, query);
  let instance: HotspotAsset | undefined;

  if (reference) {
    instance = assets.find((asset) => asset.url === reference.url);
    if (!instance) {
      instance = createAsset(state, reference);
    }
  }

  useEffect(() => {
    if (!instance) {
      setAsset(defaultAsset);
    } else if (instance.width) {
      setAsset(instance);
    } else {
      return listenTo(instance, () => setAsset(instance));
    }
  }, [instance]);

  return asset;
}
