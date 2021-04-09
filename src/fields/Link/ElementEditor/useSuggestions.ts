import { useEffect, useState } from 'react';

import { SelectOption } from '../../../components/Select';

import fetchAnchors, {
  AnchorData,
  FetchAnchorsOptions,
} from '../../../store/utils/fetchAnchors';

export interface Result {
  anchors: Array<AnchorData>;
  options: Array<SelectOption<string>>;
  suggestions: Array<string>;
}

const emptyResult: Result = {
  anchors: [],
  options: [],
  suggestions: [],
};

export default function useAnchors(options: FetchAnchorsOptions) {
  const [result, setResult] = useState<Result>(emptyResult);

  useEffect(() => {
    setResult(emptyResult);
    if (!options.elementId) {
      return;
    }

    fetchAnchors(options).then(({ anchors }) => {
      setResult({
        anchors,
        options: anchors.map((anchor) => ({
          key: anchor.id ? `#@id:${anchor.id}` : anchor.anchor,
          label: anchor.title || anchor.anchor,
        })),
        suggestions: anchors.map((anchor) => anchor.anchor),
      });
    });
  }, [options.siteId, options.elementId]);

  return result;
}
