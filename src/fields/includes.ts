import fields from './index';

import ArrayFieldDefinition, { ArrayField } from './Array';
import CheckboxFieldDefinition, { CheckboxField } from './Checkbox';
import ColorFieldDefinition, { ColorField } from './Color';
import OEmbedFieldDefinition, { OEmbedField } from './OEmbed';
import InstanceFieldDefinition, { InstanceField } from './Instance';
import LayoutFieldDefinition, { LayoutField } from './Layout';
import LightswitchFieldDefinition, { LightswitchField } from './Lightswitch';
import LinkFieldType, { LinkField } from './Link';
import LocationFieldType, { LocationField } from './Location';
import NumberFieldDefinition, { NumberField } from './Number';
import RedactorFieldDefinition, { RedactorField } from './Redactor';
import ReferenceFieldDefinition, { ReferenceField } from './Reference';
import SelectFieldDefinition, { SelectField } from './Select';
import SwatchColorFieldDefinition, { SwatchColorField } from './SwatchColor';
import TextFieldDefinition, { TextField } from './Text';
import TextareaFieldDefinition, { TextareaField } from './Textarea';

export type FieldTypeMap = {
  array: ArrayField;
  checkbox: CheckboxField;
  color: ColorField;
  instance: InstanceField;
  layout: LayoutField;
  lightswitch: LightswitchField;
  link: LinkField;
  location: LocationField;
  number: NumberField;
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
  checkbox: new CheckboxFieldDefinition(),
  color: new ColorFieldDefinition(),
  instance: new InstanceFieldDefinition(),
  layout: new LayoutFieldDefinition(),
  lightswitch: new LightswitchFieldDefinition(),
  link: new LinkFieldType(),
  location: new LocationFieldType(),
  number: new NumberFieldDefinition(),
  oembed: new OEmbedFieldDefinition(),
  redactor: new RedactorFieldDefinition(),
  reference: new ReferenceFieldDefinition(),
  select: new SelectFieldDefinition(),
  swatchcolor: new SwatchColorFieldDefinition(),
  text: new TextFieldDefinition(),
  textarea: new TextareaFieldDefinition(),
});
