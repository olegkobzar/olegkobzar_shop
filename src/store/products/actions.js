export const SET_PRODUCTS = 'Set products';
export const SET_PRODUCT = 'Set product';
export const CLEAN_PRODUCT = 'Clean product';
export const DELETE_PRODUCT = 'Delete product';

export const setProducts = data => ({ type: SET_PRODUCTS, data });
export const setProduct = data => ({ type: SET_PRODUCT, data });
export const cleanProduct = () => ({ type: CLEAN_PRODUCT });
export const deleteProduct = data => ({ type: DELETE_PRODUCT, data });
