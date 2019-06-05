import { server } from './index';

export const getProductsService = () => server.get('public/products');
export const getProductsIdService = id => server.get(`public/products/${id}`);
export const deleteProductService = id => server.delete(`products/${id}`);
export const updateProductService = (id, data) => server.put(`products/${id}`, data);
