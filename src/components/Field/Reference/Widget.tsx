import * as React from 'react';
import { connect } from 'react-redux';

import uuid from '../../../store/utils/uuid';
import { addReferences } from '../../../store/actions';
import { ReferenceField } from '.';
import { RootState, Reference } from '../../../store/models';
import { WidgetProps } from '../types';

export interface ExternalProps extends WidgetProps<ReferenceField> {
  data: Array<number> | undefined;
}

export interface Props extends ExternalProps {
  onAddReferences: (references: Array<Reference>) => void;
  references: Array<Reference>;
  sourceElementId: number | null;
}

export interface AddOptions {
  elements: Array<Reference>;
}

export class ReferenceWidget extends React.Component<Props> {
  element: HTMLDivElement | null = null;
  uuid: string = `element-${uuid()}`;
  instance: Craft.BaseElementSelectInput | null = null;

  getStoredReferences(): Array<Reference> {
    const { data, field, references } = this.props;
    const { elementType } = field;
    const result: Array<Reference> = [];

    if (!Array.isArray(data)) {
      return result;
    }

    for (const id of data) {
      const reference = references.find(
        ref => ref.id === id && ref.type === elementType
      );

      if (reference) {
        result.push(reference);
      }
    }

    return result;
  }

  getSelectedIds(): Array<number> {
    const { instance } = this;
    if (!instance) return [];

    // getSelectedElementIds() returns elements in the wrong order
    // getElements() returns deleted elements
    const ids = [];
    const actualIds = instance.getSelectedElementIds();
    const $elements = instance.getElements();

    for (let index = 0; index < $elements.length; index++) {
      const id = parseInt($elements.eq(index).data('id'));
      if (actualIds.indexOf(id) !== -1) {
        ids.push(id);
      }
    }

    return ids;
  }

  handleAdd = ({ elements }: AddOptions) => {
    const { field, onAddReferences } = this.props;

    onAddReferences(
      elements.map(reference => ({
        ...reference,
        type: field.elementType,
      }))
    );

    this.handleChange();
  };

  handleChange = () => {
    const { onUpdate } = this.props;
    onUpdate(this.getSelectedIds());
  };

  setElement = (element: HTMLDivElement | null) => {
    if (this.element === element) return;
    this.element = element;

    let { instance } = this;
    if (instance) {
      instance.off('selectElements', this.handleAdd);
      instance.off('removeElements', this.handleChange);
      if (instance.elementSort) {
        instance.elementSort.off('sortChange', this.handleChange);
      }

      instance.destroy();
      this.instance = instance = null;
    }

    if (element) {
      const { field, sourceElementId } = this.props;
      instance = new Craft.BaseElementSelectInput({
        id: this.uuid,
        name: this.uuid,
        elementType: field.elementType,
        sources: field.sources,
        criteria: null,
        sourceElementId,
        viewMode: field.viewMode,
        limit: field.limit,
        modalStorageKey: null,
      });

      for (const reference of this.getStoredReferences()) {
        const element = instance.createNewElement(reference);
        instance.appendElement(element);
        instance.addElements(element);
      }

      instance.on('selectElements', this.handleAdd);
      instance.on('removeElements', this.handleChange);
      if (instance.elementSort) {
        instance.elementSort.on('sortChange', this.handleChange);
      }

      this.instance = instance;
    }
  };

  render() {
    return (
      <div id={this.uuid} className="elementselect" ref={this.setElement}>
        <div className="elements" />
        <div className="btn add icon dashed">Choose</div>
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({
    references: state.config.references,
    sourceElementId: state.config.elementId,
  }),
  dispatch => ({
    onAddReferences: (references: Array<Reference>) => {
      dispatch(addReferences(references));
    },
  })
)(ReferenceWidget);
