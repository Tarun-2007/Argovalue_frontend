import api from './api';

export const productService = {
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    await api.delete(`/products/${id}`);
    return { success: true };
  },

  approveProduct: async (id) => {
    const response = await api.patch(`/products/${id}/approve`);
    return response.data;
  },

  rejectProduct: async (id) => {
    const response = await api.patch(`/products/${id}/reject`);
    return response.data;
  },
};
