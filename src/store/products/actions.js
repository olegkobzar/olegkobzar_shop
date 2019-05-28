export const SET_PRODUCTS = 'Set products';
export const DELETE_PRODUCTS = 'Delete products';

export const setProducts = data => ({ type: SET_PRODUCTS, data });
export const deleteProducts = () => ({ type: DELETE_PRODUCTS });
