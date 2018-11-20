import fields from './index';

import ArrayFieldDefinition, { ArrayField } from './Array';
import ColorFieldDefinition, { ColorField } from './Color';
import OEmbedFieldDefinition, { OEmbedField } from './OEmbed';
import InstanceFieldDefinition, { InstanceField } from './Instance';
import LinkFieldType, { LinkField } from './Link';
import LocationFieldType, { LocationField } from './Location';
import RedactorFieldDefinition, { RedactorField } from './Redactor';
import ReferenceFieldDefinition, { ReferenceField } from './Reference';
import SelectFieldDefinition, { SelectField } from './Select';
import SwatchColorFieldDefinition, { SwatchColorField } from './SwatchColor';
import TextFieldDefinition, { TextField } from './Text';
import TextareaFieldDefinition, { TextareaField } from './Textarea';

export type FieldTypeMap = {
  array: ArrayField;
  color: ColorField;
  instance: InstanceField;
  link: LinkField;
  location: LocationField;
  oembed: OEmbedField;
  redactor: RedactorField;
  reference: ReferenceField;
  select: SelectField;
  swatchcolor: SwatchColorField;
  text: TextField;
  textarea: TextareaField;
};

fields.initialize({
  array: new ArrayFieldDefinition(),
  color: new ColorFieldDefinition(),
  instance: new InstanceFieldDefinition(),
  link: new LinkFieldType(),
  location: new LocationFieldType(),
  oembed: new OEmbedFieldDefinition(),
  redactor: new RedactorFieldDefinition(),
  reference: new ReferenceFieldDefinition(),
  select: new SelectFieldDefinition(),
  swatchcolor: new SwatchColorFieldDefinition(),
  text: new TextFieldDefinition(),
  textarea: new TextareaFieldDefinition(),
});
