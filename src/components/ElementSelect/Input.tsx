import * as React from 'react';

import translate from '../../store/utils/translate';
import uuid from '../../store/utils/uuid';
import { Reference } from '../../store/models';
import { Props } from './index';

import './index.styl';

export interface AddOptions {
  elements: Array<Reference>;
}

export default class Input extends React.Component<Props> {
  element: HTMLDivElement | null = null;
  renderedIds: Array<number> = [];
  uuid: string = `element-${uuid()}`;
  instance: Craft.BaseElementSelectInput | null = null;
  isRendering: boolean = false;

  componentDidUpdate() {
    const { renderedIds } = this;
    const actualIds = this.props.data || [];

    if (
      actualIds.length !== renderedIds.length ||
      !actualIds.every((id, index) => id === renderedIds[index])
    ) {
      this.createReferences();
    }
  }

  createReferences() {
    const { instance } = this;
    if (!instance) {
      return;
    }

    this.isRendering = true;

    const renderedIds: Array<number> = [];
    instance.$elementsContainer.empty();

    for (const reference of this.getStoredReferences()) {
      const element = instance.createNewElement(reference);
      element.find('input').prop('disabled', true);
      instance.appendElement(element);
      renderedIds.push(reference.id);
    }

    instance.resetElements();

    this.renderedIds = renderedIds;
    this.isRendering = false;
  }

  getStoredReferences(): Array<Reference> {
    const { data, elementType, references } = this.props;
    const result: Array<Reference> = [];

    if (!Array.isArray(data)) {
      return result;
    }

    for (const id of data) {
      const reference = references.find(
        (ref) => ref.id === id && ref.type === elementType
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

    this.handleChange();

    onAddReferences(
      elements.map((reference) => ({
        ...reference,
        $element: $(reference.$element[0].outerHTML),
        element: reference.$element[0].outerHTML,
        type: elementType,
      }))
    );
  };

  handleChange = () => {
    if (this.isRendering) return;
    const { onUpdate } = this.props;
    const ids = this.getSelectedIds();

    this.renderedIds = ids;

    onUpdate(ids);
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
        allowSelfReference,
        criteria,
        elementType,
        limit = null,
        modalStorageKey = null,
        showSiteMenu,
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
        showSiteMenu,
        sources,
        sourceElementId: allowSelfReference ? null : sourceElementId,
        viewMode,
      });

      this.instance = instance;
      this.createReferences();

      instance.on('selectElements', this.handleAdd);
      instance.on('removeElements', this.handleChange);
      if (instance.elementSort) {
        instance.elementSort.on('sortChange', this.handleChange);
      }
    }
  };

  render() {
    return (
      <div
        id={this.uuid}
        className="tcfElementSelect elementselect"
        ref={this.setElement}
      >
        <div className="elements" />
        <div className="btn add icon dashed">{translate('Choose')}</div>
      </div>
    );
  }
}
