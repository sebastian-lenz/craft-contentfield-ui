import * as React from 'react';

import Icon from '../Icon';
import { Schema } from '../../store/models';

import './index.styl';

export interface Props {
  favorites: Array<string>;
  onSchema: (schema: Schema) => void;
  onToggleFavorite?: (schema: Schema) => void;
  schemas: Array<Schema>;
}

export default function SchemaList({
  favorites,
  onSchema,
  onToggleFavorite,
  schemas,
}: Props) {
  const rows = schemas.map(schema => {
    const isFavorite = favorites.indexOf(schema.qualifier) !== -1;

    return (
      <div className="tcfSchemaList--row" key={schema.qualifier}>
        <div
          className="tcfSchemaList--schema"
          onMouseUp={() => onSchema(schema)}
        >
          <Icon className="tcfSchemaList--schemaIcon" name={schema.icon} />
          <div className="tcfSchemaList--schemaLabel">{schema.label}</div>
        </div>

        {onToggleFavorite ? (
          <div
            className="tcfSchemaList-favorite"
            onClick={() => onToggleFavorite(schema)}
          >
            <Icon
              name={isFavorite ? 'material:star' : 'material:star_border'}
            />
          </div>
        ) : null}
      </div>
    );
  });

  return <div className="tcfSchemaList">{rows}</div>;
}
