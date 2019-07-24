import React from 'react';
import { Provider } from 'react-redux';
import { parse } from 'flatted';
import hoistStatics from 'hoist-non-react-statics';

import { STORE_KEY } from './const';

export const withRedux = (makeStoreClient) => {
  // store redux store so everytime wrap's getInitialProps got called
  // doesn't create new redux store
  let storedReduxStore;

  return (Wrap) => {
    class ReduxWrapper extends React.Component {
      static displayName = `<ReduxWrapper Component={Wrap} />`;

      render() {
        const { store, ...props } = this.props;

        return (
          <Provider store={store}>
            <Wrap store={store} {...props} />
          </Provider>
        );
      }
    }

    // Hoist all Wrap statics back to ReduxWrapper
    const ReduxWrapperComponent = hoistStatics(ReduxWrapper, Wrap);

    // Alter the getInitialProps to use ReduxWrapper's
    // Make the redux store available on other's getInitialProps
    // By holding the Wrap's getInitialProps call until the end
    // If Wrap's GIP doesnt return anything, we return our own context
    ReduxWrapperComponent.getInitialProps = async (ctx) => {
      const isServer = typeof window === 'undefined';

      if (isServer) {
        storedReduxStore = makeStoreClient(isServer, {});
      } else {
        const initialState = document.querySelectorAll('noscript#' + STORE_KEY).item(0);
        let data = {};

        if (initialState) {
          const { textContent } = initialState;
          data = parse(textContent || '');

          // remove element after hydrate
          initialState.remove();

          storedReduxStore = makeStoreClient(isServer, data);
        }
      }

      try {
        const context = {
          ...ctx,
          store: storedReduxStore,
        };

        // Return store in any condition in order for Provider to receive the store
        if (typeof Wrap.getInitialProps === 'function') {
          const wrapInitialProps = await Wrap.getInitialProps.call(Wrap, context);
          return {
            ...wrapInitialProps,
            store: storedReduxStore,
            _global_: { ...(wrapInitialProps || {})._global_, store: storedReduxStore },
          };
        }

        return { store: storedReduxStore, _global_: { store: storedReduxStore } };
      } catch (err) {
        console.error('[@airy/maleo-redux-plugin]', err);
        return { store: storedReduxStore, _global_: { store: storedReduxStore } };
      }
    };

    return ReduxWrapperComponent;
  };
};
