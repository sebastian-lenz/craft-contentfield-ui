import * as React from 'react';
import cx from 'classnames';
import { Dispatch } from 'redux';

import Button from '../Button';
import FieldPanel from '../FieldPanel';
import Icon from '../Icon';
import Text from '../Text';
import { Model } from '../../store/models';
import { uuidVisibility } from '../../store/actions';

export interface Props {
  disabled?: boolean;
  dispatch: Dispatch;
  model: Model;
}

export default function VisibilityToggle({ disabled, dispatch, model }: Props) {
  const icon = model.__visible
    ? 'material:visibility'
    : 'material:visibility_off';

  const label = (
    <>
      <Text value="Visibility" />
      <Icon
        className={cx('tcfInstance--controlsVisibilityIcon', {
          off: !model.__visible,
        })}
        name={icon}
      />
    </>
  );

  return (
    <FieldPanel label={label} className="tcfInstance--controlsVisibility">
      <Button
        disabled={disabled}
        onClick={() => dispatch(uuidVisibility(model.__uuid))}
      >
        <Text value={model.__visible ? 'Hide' : 'Show'} />
      </Button>
    </FieldPanel>
  );
}
