import { server } from './index';

export const getProductsService = () => server.get('public/products');
export const getProductsIdService = id => server.get(`public/products/${id}`);
