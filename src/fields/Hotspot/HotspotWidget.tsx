import * as React from 'react';
import { connect } from 'react-redux';

import { useHotspotAsset } from './utils/useHotspotAsset';
import { Editor } from './Editor';
import { isHotspot } from './utils';
import type { HotspotField } from './types';
import type { WidgetProps } from '../FieldDefinition';
import type { RootState } from '../../store/models';
import { Preview } from './Preview';

export type Props = WidgetProps<HotspotField> & {
  state: RootState;
};

export function HotspotWidget({
  data,
  disabled,
  field,
  model,
  onUpdate,
  state,
}: Props) {
  const [hasDialog, setHasDialog] = React.useState(false);
  const asset = useHotspotAsset(state, model, field.assetQuery);
  const shapes = isHotspot(data) ? data : [];

  return (
    <>
      <Preview
        asset={asset}
        onClick={disabled ? undefined : () => setHasDialog(true)}
        shapes={shapes}
      />

      {hasDialog ? (
        <Editor
          allowedShapes={field.allowedShapes}
          asset={asset}
          maxShapes={field.maxShapes}
          onChange={(shapes) => onUpdate(shapes)}
          onClose={() => setHasDialog(false)}
          shapes={shapes}
        />
      ) : null}
    </>
  );
}

export default connect((state: RootState) => ({
  state,
}))(HotspotWidget);
