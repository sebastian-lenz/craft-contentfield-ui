import * as React from 'react';

import Text from '../../../components/Text';
import useDroplet from '../utils/useDroplet';
import { ArrayField } from '..';
import { Path } from '../../../store/utils/parsePath';

export interface Props {
  field: ArrayField;
  path: Path;
}

export default function Droplet(props: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [, drop] = useDroplet(props);
  drop(ref);

  return (
    <div className="tcfArrayWidgetList--empty" key="empty" ref={ref}>
      <Text value="Drop elements here" />
    </div>
  );
}
