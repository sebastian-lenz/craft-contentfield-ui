import * as React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import ExpandedStateProvider from '../../contexts/ExpandedStateProvider';
import findByUuid from '../../store/utils/findByUuid';
import InstanceForm from '../../components/InstanceForm';
import Text from '../../components/Text';
import Window from '../../components/Window';
import { EditOverlayState, OverlayState } from '../../store/models/overlay';
import { RootState, Model } from '../../store/models';
import { AnyPathSegment } from '../../store/utils/parsePath';
import { setOverlay } from '../../store/actions';

export interface Props extends EditOverlayState {
  model: Model;
  path: Array<AnyPathSegment>;
  setOverlay: (overlay: OverlayState) => void;
}

class EditInstance extends React.Component<Props> {
  originalModel: Model | null = null;

  constructor(props: Props) {
    super(props);
    this.originalModel = props.model;
  }

  close() {
    this.props.setOverlay(null);
  }

  handleCancel = () => {
    this.close();
  };

  handleApply = () => {
    this.close();
  };

  render() {
    const { model, path } = this.props;

    return (
      <ExpandedStateProvider>
        <Window>
          <Window.Content>
            <InstanceForm model={model} path={path} />
          </Window.Content>
          <Window.Footer>
            <Button onClick={this.handleApply}>
              <Text value="Apply" />
            </Button>
          </Window.Footer>
        </Window>
      </ExpandedStateProvider>
    );
  }
}

export default connect(
  (state: RootState, props: EditOverlayState) => {
    return findByUuid(state, props.uuid);
  },
  (dispatch) => ({
    setOverlay: (overlay: OverlayState) => dispatch(setOverlay(overlay)),
  })
)(EditInstance);
