import fields from './index';

import ArrayFieldDefinition, { ArrayField } from './Array';
import ColorFieldDefinition, { ColorField } from './Color';
import InstanceFieldDefinition, { InstanceField } from './Instance';
import RedactorFieldDefinition, { RedactorField } from './Redactor';
import ReferenceFieldDefinition, { ReferenceField } from './Reference';
import SelectFieldDefinition, { SelectField } from './Select';
import TextFieldDefinition, { TextField } from './Text';
import TextareaFieldDefinition, { TextareaField } from './Textarea';

export type FieldTypeMap = {
  array: ArrayField;
  color: ColorField;
  instance: InstanceField;
  redactor: RedactorField;
  reference: ReferenceField;
  select: SelectField;
  text: TextField;
  textarea: TextareaField;
};

fields.initialize({
  array: new ArrayFieldDefinition(),
  color: new ColorFieldDefinition(),
  instance: new InstanceFieldDefinition(),
  redactor: new RedactorFieldDefinition(),
  reference: new ReferenceFieldDefinition(),
  select: new SelectFieldDefinition(),
  text: new TextFieldDefinition(),
  textarea: new TextareaFieldDefinition(),
});
