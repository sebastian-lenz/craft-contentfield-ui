import * as React from 'react';

import translate from '../../store/utils/translate';
import uuid from '../../store/utils/uuid';
import { Props } from './index';
import { Reference, ReferenceValue } from '../../store/models';
import { getCardByViewMode, referenceEuqals, toListClass } from './utils';

import './index.styl';

export interface AddReference {
  $element: JQuery;
  $modalElement: JQuery;
  hasThumb: boolean;
  id: number;
  label: string;
  siteId: number;
  status: string;
  url: string;
}

export interface AddOptions {
  elements: Array<AddReference>;
}

export default class Input extends React.Component<Props> {
  element: HTMLDivElement | null = null;
  rendered: Array<ReferenceValue> = [];
  uuid: string = `element-${uuid()}`;
  instance: Craft.BaseElementSelectInput | null = null;
  isRendering: boolean = false;

  componentDidUpdate() {
    const { rendered } = this;
    const values = this.props.data || [];

    if (
      values.length !== rendered.length ||
      !values.every((value, index) => referenceEuqals(value, rendered[index]))
    ) {
      this.createReferences();
    }
  }

  createReferences() {
    const { instance } = this;
    if (!instance) {
      return;
    }

    const { viewMode } = this.props;
    const rendered: Array<ReferenceValue> = [];

    this.isRendering = true;
    instance.$elementsContainer.empty();

    for (const reference of this.getStoredReferences()) {
      const element = instance.createNewElement({
        $element: $(getCardByViewMode(reference, viewMode)),
        id: reference.id,
        label: reference.label,
      });

      element.find('input').prop('disabled', true);
      instance.appendElement(element);
      rendered.push({
        id: reference.id,
        siteId: reference.siteId,
      });
    }

    instance.resetElements();

    this.rendered = rendered;
    this.isRendering = false;
  }

  getStoredReferences(): Array<Reference> {
    const { data, elementType, references } = this.props;
    const result: Array<Reference> = [];

    if (!Array.isArray(data)) {
      return result;
    }

    for (const value of data) {
      const reference = references.find(
        (ref) => referenceEuqals(ref, value) && ref.type === elementType
      );

      if (reference) {
        result.push(reference);
      }
    }

    return result;
  }

  getSelected(): Array<ReferenceValue> {
    const { instance } = this;
    if (!instance) return [];

    // getSelectedElementIds() returns elements in the wrong order
    // getElements() returns deleted elements
    const values: Array<ReferenceValue> = [];
    const $elements = instance.getElements();
    const selected = instance.getSelectedElementIds();

    for (let index = 0; index < $elements.length; index++) {
      const $element = $elements.eq(index);
      const id = parseInt($element.data('id'));
      if (selected.indexOf(id) === -1) {
        continue;
      }

      values.push({
        id,
        siteId: parseInt($element.data('site-id')),
      });
    }

    return values;
  }

  handleAdd = ({ elements }: AddOptions) => {
    const { onAddReferences } = this.props;
    this.handleChange();

    onAddReferences(
      elements.map((element) => ({
        id: element.id,
        siteId: element.siteId,
      }))
    );
  };

  handleChange = () => {
    if (this.isRendering) return;
    const { onUpdate } = this.props;
    const ids = this.getSelected();

    this.rendered = ids;

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
        condition = null,
        criteria,
        elementType,
        limit = null,
        modalStorageKey = null,
        referenceElementId = null,
        referenceElementSiteId = null,
        showActionMenu = true,
        showSiteMenu,
        sourceElementId,
        sources,
        viewMode = 'list',
      } = this.props;

      instance = new Craft.BaseElementSelectInput({
        condition,
        criteria,
        elementType,
        id: this.uuid,
        limit,
        modalStorageKey,
        name: this.uuid,
        referenceElementId,
        referenceElementSiteId,
        showActionMenu,
        showSiteMenu,
        sources,
        sourceElementId: allowSelfReference ? null : sourceElementId,
        viewMode: viewMode == 'grid' ? 'cards' : viewMode,
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
        <ul className={toListClass(this.props.viewMode)} />
        <div className="flex flex-nowrap">
          <button className="btn add icon dashed">{translate('Choose')}</button>
          <div className="spinner hidden"></div>
        </div>
      </div>
    );
  }
}
