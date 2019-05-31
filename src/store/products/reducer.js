import store from '../state';
import { SET_PRODUCTS, DELETE_PRODUCTS, SET_PRODUCT, DELETE_PRODUCT } from './actions';

export const products = (state = store.products, action) => {
  switch (action.type) {
    case SET_PRODUCTS: return action.data;
    case DELETE_PRODUCTS: return store.products;
  }

  return state;
};

export const product = (state = store.product, action) => {
  switch (action.type) {
    case SET_PRODUCT: return action.data;
    case DELETE_PRODUCT: return store.product;
  }

  return state;
};
