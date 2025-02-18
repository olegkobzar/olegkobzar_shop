import store from '../state';
import {
  SET_CATEGORIES, DELETE_CATEGORIES, SET_CATEGORY, DELETE_CATEGORY, SET_INFO
} from './actions';

export const categories = (state = store.categories, action) => {
  switch (action.type) {
    case SET_CATEGORIES: return action.data;
    case DELETE_CATEGORIES: return store.categories;
  }

  return state;
};

export const category = (state = store.category, action) => {
  switch (action.type) {
    case SET_CATEGORY: return action.data;
    case DELETE_CATEGORY: return store.category;
  }

  return state;
};

export const info = (state = store.info, action) => {
  switch (action.type) {
    case SET_INFO: return action.data;
  }

  return state;
};
