import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ButtonFlat from '../ButtonFlat';
import Flyout from '../Flyout';
import Icon from '../Icon';
import SchemaList from '../SchemaList';
import Text from '../Text';
import { Schema, RootState, Schemas } from '../../store/models';
import { toggleUserFavorite } from '../../store/actions';

export interface Props {
  onCreate: (schema: Schema) => void;
  schemas: Schema[];
  scope?: string;
}

export default function MultipleFactory({ onCreate, schemas, scope }: Props) {
  const [isExpanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  let favorites: string[] = [];
  let handleToggleFavorite;
  let quickButtons = null;

  if (scope) {
    const { favoriteSchemas } = useSelector((state: RootState) => state.user);
    favorites = scope in favoriteSchemas ? favoriteSchemas[scope] : [];

    if (favorites.length) {
      quickButtons = schemas
        .filter(schema => favorites.indexOf(schema.qualifier) !== -1)
        .map(schema => (
          <ButtonFlat
            className="tcfFactory--quickButton"
            key={schema.qualifier}
            onClick={() => onCreate(schema)}
            secondary
          >
            <Icon name={schema.icon} />
            <div>{schema.label}</div>
          </ButtonFlat>
        ));
    }

    handleToggleFavorite = (schema: Schema) => {
      dispatch(toggleUserFavorite(scope, schema.qualifier));
    };
  }

  const handleSchema = (schema: Schema) => {
    setExpanded(false);
    onCreate(schema);
  };

  return (
    <div className="tcfFactory multiple">
      <ButtonFlat
        className="tcfFactory--primaryButton"
        onMouseDown={() => setExpanded(true)}
      >
        <Icon name="plus" />
        <Text value="Create" />

        {isExpanded ? (
          <Flyout onClick={() => setExpanded(false)}>
            <SchemaList
              favorites={favorites}
              onSchema={handleSchema}
              onToggleFavorite={handleToggleFavorite}
              schemas={schemas}
            />
          </Flyout>
        ) : null}
      </ButtonFlat>
      {quickButtons}
    </div>
  );
}
