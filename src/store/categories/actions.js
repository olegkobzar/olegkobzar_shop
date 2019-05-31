export const SET_CATEGORIES = 'Set categories';
export const DELETE_CATEGORIES = 'Delete categories';
export const SET_CATEGORY = 'Set category';
export const DELETE_CATEGORY = 'Delete category';
export const SET_INFO = 'Set info';

export const setCategories = data => ({ type: SET_CATEGORIES, data });
export const deleteCategories = () => ({ type: DELETE_CATEGORIES });
export const setCategory = data => ({ type: SET_CATEGORY, data });
export const deleteCategory = () => ({ type: DELETE_CATEGORY });
export const setInfo = data => ({ type: SET_INFO, data });
