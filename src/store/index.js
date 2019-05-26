import { createStore, combineReducers } from 'redux';
import { user } from './user';

const rootReducers = combineReducers({
  user
});

export const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
);
// second argument is used to add redux dev tool (should be pre-installed in browser)
