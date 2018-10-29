import * as React from 'react';

import './index.styl';

export default function ActivityIndicator() {
  return (
    <div className="tcfActivityIndicator">
      <div className="tcfActivityIndicator--bounce first" />
      <div className="tcfActivityIndicator--bounce second" />
      <div className="tcfActivityIndicator--bounce third" />
    </div>
  );
}
