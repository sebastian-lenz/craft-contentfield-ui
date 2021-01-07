import * as React from 'react';

export interface Props {
  columnsPerRow: number;
}

export default function Grid({ columnsPerRow }: Props) {
  const gridColumns = [];
  for (let index = 0; index < columnsPerRow; index++) {
    gridColumns.push(
      <div className="tcfLayoutPreview--gridColumn" key={index} />
    );
  }

  return <div className="tcfLayoutPreview--grid">{gridColumns}</div>;
}
