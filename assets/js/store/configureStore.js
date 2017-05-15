import { createStore } from 'redux';
import Reducer from '../reducers/index';

export default function configureStore() {
  const store = createStore(Reducer);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store;
}
