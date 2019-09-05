import * as React from 'react';

import FieldGroup from '../../components/FieldGroup';
import FieldPanel from '../../components/FieldPanel';
import Select, { SelectOption } from '../../components/Select';
import translate from '../../store/utils/translate';
import Window from '../../components/Window';
import { FactoryComponent } from '../../fields/FieldDefinition';
import { Field } from '../../store/models';
import { UuidInsertPosition } from '../../store/actions/uuidInsert';

const positionOptions: Array<SelectOption<UuidInsertPosition>> = [
  {
    key: 'before',
    label: 'Before selected element',
  },
  {
    key: 'after',
    label: 'After selected element',
  },
];

export interface Props<T extends Field> {
  Factory: FactoryComponent<T>;
  field: T;
  onCreate: (value: any, position: UuidInsertPosition) => void;
  scope?: string;
}

export default function Form<T extends Field>({
  Factory,
  field,
  onCreate,
  scope,
}: Props<T>) {
  const [position, setPosition] = React.useState<UuidInsertPosition>('before');

  return (
    <Window width={600}>
      <Window.Content>
        <FieldGroup>
          <FieldPanel
            instructions={translate(
              'Select where the new element should be inserted.'
            )}
            label={translate('Position')}
          >
            <Select
              onChange={setPosition}
              options={positionOptions.map(option => ({
                ...option,
                label: translate(option.label),
              }))}
              value={position}
            />
          </FieldPanel>
        </FieldGroup>
      </Window.Content>
      <Window.Footer flex={false}>
        <Factory
          field={field}
          onCreate={value => onCreate(value, position)}
          scope={scope}
        />
      </Window.Footer>
    </Window>
  );
}
