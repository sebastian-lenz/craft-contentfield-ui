import * as React from 'react';
import { connect } from 'react-redux';

import uuid from '../../store/utils/uuid';
import { addReferences } from '../../store/actions';
import { RootState, Reference } from '../../store/models';

export interface ExternalProps {
  criteria?: Craft.BaseElementSelectCriteria | null;
  data: Array<number> | undefined;
  elementType: string;
  limit: number | null;
  modalStorageKey?: string | null;
  sources: string[] | null;
  onUpdate: (references: Array<number>) => void;
  viewMode: 'large' | 'small';
}

export interface Props extends ExternalProps {
  onAddReferences: (references: Array<Reference>) => void;
  references: Array<Reference>;
  sourceElementId: number | null;
}

export interface AddOptions {
  elements: Array<Reference>;
}

export class ElementSelect extends React.Component<Props> {
  element: HTMLDivElement | null = null;
  uuid: string = `element-${uuid()}`;
  instance: Craft.BaseElementSelectInput | null = null;

  getStoredReferences(): Array<Reference> {
    const { data, elementType, references } = this.props;
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
    const { elementType, onAddReferences } = this.props;

    onAddReferences(
      elements.map(reference => ({
        ...reference,
        $element: $(reference.$element[0].outerHTML),
        element: reference.$element[0].outerHTML,
        type: elementType,
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
      const {
        criteria,
        elementType,
        limit = null,
        modalStorageKey = null,
        sourceElementId,
        sources,
        viewMode = 'small',
      } = this.props;

      instance = new Craft.BaseElementSelectInput({
        criteria,
        elementType: elementType,
        id: this.uuid,
        limit,
        modalStorageKey,
        name: this.uuid,
        sources,
        sourceElementId,
        viewMode,
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
)(ElementSelect);
