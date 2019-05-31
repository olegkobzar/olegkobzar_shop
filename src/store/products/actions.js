export const SET_PRODUCTS = 'Set products';
export const DELETE_PRODUCTS = 'Delete products';
export const SET_PRODUCT = 'Set product';
export const DELETE_PRODUCT = 'Delete product';

export const setProducts = data => ({ type: SET_PRODUCTS, data });
export const deleteProducts = () => ({ type: DELETE_PRODUCTS });
export const setProduct = data => ({ type: SET_PRODUCT, data });
export const deleteProduct = () => ({ type: DELETE_PRODUCT });
