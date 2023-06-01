import * as React from 'react';

import Checkbox from '../../components/Checkbox';
import ElementEditor from './ElementEditor';
import InputEditor from './InputEditor';
import Select from '../../components/Select';
import Text from '../../components/Text';
import { isLink, Link } from './Link';
import { LinkField } from './index';
import { WidgetProps } from '../FieldDefinition';

import './LinkWidget.styl';

export interface Props extends WidgetProps<LinkField> {}

export default function LinkWidget({
  data,
  disabled,
  field,
  model,
  onUpdate,
}: Props) {
  let link: Link;
  if (isLink(data)) {
    link = data;
  } else {
    link = {
      elementId: 0,
      hash: '',
      openInNewWindow: false,
      siteId: 0,
      type: '',
      url: '',
    };
  }

  const linkType = field.linkTypes[link.type];
  let editor: React.ReactNode;

  if (linkType && linkType.type === 'input') {
    editor = (
      <InputEditor
        disabled={disabled}
        key={link.type}
        link={link}
        linkType={linkType}
        onUpdate={onUpdate}
      />
    );
  } else if (linkType && linkType.type === 'element') {
    editor = (
      <ElementEditor
        disabled={disabled}
        key={link.type}
        link={link}
        linkType={linkType}
        modalStorageKey={`tcf_${model.__type}_${field.name}_${linkType.type}`}
        onUpdate={onUpdate}
      />
    );
  }

  const { allowNewWindow } = field;
  return (
    <div className="tcfLinkWidget">
      <div className="tcfLinkWidget--type">
        <Select
          disabled={disabled}
          options={Object.keys(field.linkTypes).map((key) => ({
            key,
            label: field.linkTypes[key].label,
          }))}
          value={link.type}
          onChange={(type) => onUpdate({ ...link, type })}
        />
      </div>
      {editor}
      {allowNewWindow ? (
        <Checkbox
          disabled={disabled}
          onChange={(openInNewWindow) => onUpdate({ ...link, openInNewWindow })}
          value={link.openInNewWindow}
        >
          <Text value="New window" />
        </Checkbox>
      ) : null}
    </div>
  );
}
