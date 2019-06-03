import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { user } from './user';
import { products, product } from './products';
import { categories, category, info } from './categories';
import { status } from './status';
import { rootSaga } from './sagas';

const rootReducers = combineReducers({
  user,
  products,
  product,
  categories,
  category,
  info,
  status
});

export const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
);
// second argument is used to add redux dev tool (should be pre-installed in browser)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const rootReducers = combineReducers({
  user,
  products,
  product,
  categories,
  category,
  info,
  status
});

export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);