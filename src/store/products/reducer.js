import store from '../state';
import { SET_PRODUCTS, DELETE_PRODUCTS } from './actions';

export const products = (state = store.products, action) => {
  switch (action.type) {
    case SET_PRODUCTS: return action.data;
    case DELETE_PRODUCTS: return store.products;
  }

  return state;
};
