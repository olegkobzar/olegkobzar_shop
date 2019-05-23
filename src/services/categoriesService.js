import { server } from './index';

export const getCategoriesService = () => server.get('public/categories');
export const getCategoriesIdService = id => server.get(`public/categories/${id}`);
export const getShopInfoService = () => server.get('shop_info');
