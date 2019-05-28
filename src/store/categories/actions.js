export const SET_CATEGORIES = 'Set categories';
export const DELETE_CATEGORIES = 'Delete categories';

export const setCategories = data => ({ type: SET_CATEGORIES, data });
export const deleteCategories = () => ({ type: DELETE_CATEGORIES });
