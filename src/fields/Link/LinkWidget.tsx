import * as React from 'react';

import ElementEditor from './ElementEditor';
import InputEditor from './InputEditor';
import Select from '../../components/Select';
import { isLink, Link } from './Link';
import { LinkField } from './index';
import { WidgetProps } from '../FieldDefinition';

import './LinkWidget.styl';

export interface Props extends WidgetProps<LinkField> {}

export default function LinkWidget({ data, field, onUpdate }: Props) {
  let link: Link;
  if (isLink(data)) {
    link = data;
  } else {
    link = { elementId: 0, type: '', url: '' };
  }

  const linkType = field.linkTypes[link.type];
  let editor: React.ReactNode;
  if (linkType && linkType.type === 'input') {
    editor = (
      <InputEditor link={link} linkType={linkType} onUpdate={onUpdate} />
    );
  } else if (linkType && linkType.type === 'element') {
    editor = (
      <ElementEditor link={link} linkType={linkType} onUpdate={onUpdate} />
    );
  }

  return (
    <div className="tcfLinkWidget">
      <div className="tcfLinkWidget--type">
        <Select
          options={Object.keys(field.linkTypes).map(key => ({
            key,
            label: field.linkTypes[key].label,
          }))}
          value={link.type}
          onChange={type => onUpdate({ ...link, type })}
        />
      </div>
      <div className="tcfLinkWidget--editor">{editor}</div>
    </div>
  );
}
