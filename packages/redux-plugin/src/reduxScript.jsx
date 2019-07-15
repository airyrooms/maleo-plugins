import React from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'flatted';

import { STORE_KEY } from './const';

export class ReduxScript extends React.Component {
  static contextTypes = {
    initialProps: PropTypes.any,
  };

  render() {
    const {
      wrap: { store },
    } = this.context.initialProps;
    const preloadedState = store.getState();

    return (
      <noscript
        id={STORE_KEY}
        dangerouslySetInnerHTML={{
          __html: stringify(preloadedState),
        }}
      />
    );
  }
}
