import * as React from 'react';
import cx from 'classnames';

import { CKEditorField } from './index';
import { WidgetProps } from '../FieldDefinition';
import api from '@app/index';

interface CKEditor {
  destroy(): void;

  model: {
    document: {
      on(name: string, callback: Function): void;
    };
  };
}

declare namespace CKEditor5 {
  export namespace craftcms {
    export function create(el: HTMLElement, config: any): Promise<CKEditor>;
  }
}

export type Props = WidgetProps<CKEditorField>;

export default class CKEditorWidget extends React.Component<Props> {
  editor: CKEditor | null = null;

  onChange() {}

  render() {
    const { data, disabled, field, onUpdate } = this.props;

    if (disabled) {
      return (
        <div
          className="noteditable"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      );
    }

    return (
      <div
        className={cx(field.editorClass, {
          'ck-with-show-word-count': field.showWordCount,
        })}
      >
        <textarea
          defaultValue={data}
          onInput={(e) => {
            debugger;
            onUpdate(e.currentTarget.value);
          }}
          ref={this.setElement}
        />

        {field.showWordCount ? (
          <div className="ck-word-count light smalltext">&nbps;</div>
        ) : null}
      </div>
    );
  }

  setElement = (el: HTMLTextAreaElement | null) => {
    const { editor } = this;
    this.editor = null;
    if (editor) {
      editor.destroy();
    }

    if (el) {
      const config = api.getCKEditor(this.props.field.configId);
      CKEditor5.craftcms.create(el, config).then((value) => {
        value.model.document.on('change', () => {
          this.props.onUpdate(el.value);
        });

        this.editor = value;
      });
    }
  };
}
