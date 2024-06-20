import api from '../index';

const getCategories = () => {
    return api.get('api/categories');
};

const getCategoryById = (id) => {
    return api.get(`api/categories/${id}`);
};

const getCategoriesByFilter = (data) => {
    return api.post('api/categories/search', data);
};

const addCategory = (data) => {
    return api.post('api/categories', data);
};

const updateCategory = (id, data) => {
    return api.put(`api/categories/${id}`, data);
};

const deleteCategory = (id) => {
    return api.delete(`api/categories/${id}`);
};

export default {
    getCategories,
    getCategoryById,
    getCategoriesByFilter,
    addCategory,
    updateCategory,
    deleteCategory,
};
